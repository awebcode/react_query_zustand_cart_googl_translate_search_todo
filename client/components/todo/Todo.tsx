"use client";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import Task from "./Task";

const TodoApp = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | any>(null);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: uuid(), text: newTask }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task: any) => task.id !== id);
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleEditTask = (id: string) => {
    setEditingTaskId(id);
    const editingTask = tasks.find((task: any) => task.id === id);
    setNewTask(editingTask.text);
  };

  const handleSaveEdit = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = tasks.map((task: any) =>
        task.id === editingTaskId ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setNewTask("");
      setEditingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    setNewTask("");
    setEditingTaskId(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 text-white">
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mr-2 p-2 border text-neutral-900"
          placeholder="Add a new task"
        />
        {editingTaskId === null ? (
          <button onClick={handleAddTask} className="p-2 bg-blue-500 text-white">
            Add Task
          </button>
        ) : (
          <button onClick={handleSaveEdit} className="p-2 bg-green-500 text-white">
            Save Edit
          </button>
        )}
      </div>
      <ul className="mt-4">
        {tasks.map((task: any) => (
          <Task
            key={task.id}
            task={task}
            isEditing={editingTaskId === task.id}
            onEdit={() => handleEditTask(task.id)}
            onSave={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={() => handleDeleteTask(task.id)}
            value={newTask}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
