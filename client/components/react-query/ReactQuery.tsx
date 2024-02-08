"use client";
// Import necessary libraries
import { fethQueryData, postData } from "@/actions/queryActions";
import React, { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Fething from "./Fething";

// Your React component
const ReactQuery = () => {
  const queryClient = useQueryClient();

  // React Query mutation for creating or updating data
  const mutation = useMutation({
    mutationFn: (data: any) => postData(data),
    mutationKey: ["products"],
    onSuccess: () => {
      console.log("onSuccess");
      // Invalidate and refetch the query data after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // State for input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Event handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postdata = { title, description };
    // Call the mutation function with the input values
    mutation.mutate(postdata);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow text-white">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      <div>{/* <Fething /> */}</div>
    </div>
  );
};

export default ReactQuery;
