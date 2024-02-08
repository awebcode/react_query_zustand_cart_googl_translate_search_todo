"use client";
import React, { useState } from "react";

const Todo = () => {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [isEditing, setisEditing] = useState<number | any>(null);
  //addNewTodo
  const addNewTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prev: any) => [newTask, ...prev]);
      setNewTask("");
    }
  };
  //getIndex
  const editHandler = (index: number) => {
    setisEditing(index);
    setNewTask(tasks[index]);
  };
  //update todo
  const updateTaskHandler = () => {
    if (newTask.trim() !== "" && isEditing !== null) {
      let updateAbletask = [...tasks];
      updateAbletask[isEditing] = newTask;
      setTasks(updateAbletask);
      setNewTask("");
      setisEditing(null);
    }
  };
  //delete todo
  const deleteHandler = (index: number) => {
    const filteredTasks = tasks.filter((_: any, t: number) => t !== index);
    setTasks(filteredTasks);
    setisEditing(null);
  };
  return (
    <div className="wrapper min-h-screen flexCenter">
      <div className="container mx-auto flexCenter">
        <div className="flex flex-col gap-4 max-w-xl">
          <label htmlFor="task" className="text-white">
            Add Task
          </label>
          <input
            placeholder="Add new task"
            type="text"
            className="p-3 text-slate-800 bg-white border border-green-500 hover:border-purple-500 duration-300 transition-all"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          {isEditing !== null ? (
            <button onClick={updateTaskHandler} className="btn">
              Edit Task
            </button>
          ) : (
            <button onClick={addNewTask} className="btn">
              Add Task
            </button>
          )}
          <div className="flex flex-col gap-4">
            {tasks.length > 0 &&
              tasks.map((task: string, index: number) => (
                <div className="flexBetween text-white" key={index}>
                  <li>{task}</li>
                  <div className="flex gap-2">
                    {" "}
                    <button
                      onClick={() => editHandler(index)}
                      className="btn px-3 bg-green-400 text-gray-900 py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHandler(index)}
                      className="btn px-3 bg-rose-400 py-2 text-gray-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
