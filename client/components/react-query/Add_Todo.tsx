"use client";
import { getSingleTodo, postTodoData, updateTodoData } from "@/actions/queryActions";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import FetchTodo from "./FetchTodo";
import useCustomMutation from "@/hooks/useCustomMutaion";
type TinitData = {
  title: string;
  description: string;
};
type TodoType = {
  isEditing: number;
  setEditing: (x: any) => void;
};
const Todo = ({ isEditing, setEditing }: TodoType) => {
  const [state, setState] = useState<TinitData>({ title: "", description: "" });
  const queryClient = useQueryClient();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  type Todo = {
    title: string;
    description: string;
  };
  const { mutation, handleMutation } = useCustomMutation<Todo[], Error, Todo>({
    queryKey: ["todos"],
    mutationFn: postTodoData,
  });
  const handleSubmit = () => {
    handleMutation(state);
    setState({ title: "", description: "" });
  };
  useEffect(() => {
    async function fetch() {
      if (isEditing) {
        const res = await getSingleTodo(isEditing);
        setState(res.todo);
      }
    }
    fetch();
    //  return () => fetch();
  }, [isEditing]);
  //update
  const updateMutation = useMutation({
    mutationFn: ({ data, id }: any) => updateTodoData(data, id),
    onSuccess: () => {
      // alert("Todo Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateTodo = async () => {
    updateMutation.mutate({ data: state, id: isEditing });
    setEditing(null);
    setState({ title: "", description: "" });
  };
  return (
    <div
      className="container mx-auto
     text-white flex flex-col"
    >
      <div className="flex flex-col m-3">
        <label htmlFor="title">Title</label>

        <input
          type="text"
          className="text-black p-4"
          name="title"
          value={state.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="m-3 flex flex-col">
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          className="text-black p-4"
          name="description"
          value={state.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {mutation.isSuccess && <h1 className="text-green-500">Todo Posted</h1>}
      {isEditing ? (
        <button
          // disabled={mutation.isPending}
          onClick={() => updateTodo()}
          className="btn bg-white"
          type="submit"
        >
          Update Todo
        </button>
      ) : (
        <button
          disabled={mutation.isPending}
          onClick={() => handleSubmit()}
          className="btn bg-white"
          type="submit"
        >
          Post Todo
        </button>
      )}
    </div>
  );
};

export default Todo;
