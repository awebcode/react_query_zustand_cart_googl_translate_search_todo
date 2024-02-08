"use client"
// Task.js
import React from "react";

const Task = ({
  task,
  value,
  isEditing,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
  onChange,
}: any) => (
  <li className="flex justify-between items-center border p-2 mt-2">
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="mr-2 p-2 border text-neutral-900 w-full"
      />
    ) : (
      <span>{task.text}</span>
    )}
    <div>
      {isEditing ? (
        <div className="flex">
          <button onClick={onSave} className="p-2 bg-green-500 text-white">
            Save
          </button>
          <button onClick={onCancelEdit} className="p-2 bg-rose-500 text-white m-2">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button onClick={onEdit} className="ml-2 p-2 bg-yellow-500 text-white">
            Edit
          </button>
          <button onClick={onDelete} className="ml-2 p-2 bg-red-500 text-white">
            Delete
          </button>
        </>
      )}
    </div>
  </li>
);

export default Task;
