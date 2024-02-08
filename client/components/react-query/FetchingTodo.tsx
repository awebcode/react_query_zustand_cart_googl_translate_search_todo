"use client";
import {
  deleteTodoData,
  fethQueryData,
  fethTodoData,
  getSingleTodo,
  updateTodoData,
} from "@/actions/queryActions";
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Todo from "./Add_Todo";
const FetchingTodo = () => {
  const [initUpdData, setUpdateData] = useState<any>();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<number | any>(null);
  const { data, error, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["todos"],

      queryFn: fethTodoData,

      getNextPageParam: (lastPage: any) => {
        const { prevOffset, total, limit = 5 } = lastPage;

        // Calculate the next offset based on the limit
        const nextOffset = prevOffset + limit;

        // Check if there are more items to fetch
        if (nextOffset >= total) {
          return;
        }

        return nextOffset;
      },
      initialPageParam: 0,
    });

  const todos = data?.pages.flatMap((page) => page?.todos);
  // const articles = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.articles];
  // }, []);
  if (isLoading) {
    return <h1 className="text-white animate-pulse">Loading...</h1>;
  }
  if (isError) {
    return <h1 className="text-white">{error?.message}</h1>;
  }
  //delete
  const deleteMutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: (id: number) => deleteTodoData(id),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteTodo = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const updateTodo = async (id: number) => {
    if (editing === null) {
      setEditing(id);
    } else {
      setEditing(null);
    }

    // updateMutation.mutate(data);
  };

  return (
    <div>
      {editing !== null ? <Todo isEditing={editing} setEditing={setEditing} /> : ""}
      <h1>Total:{data?.pages[0]?.total}</h1>
      <h1>Skip:{data?.pages[data?.pages.length - 1]?.skip}</h1>
      <h1>Limit:{data?.pages[0]?.limit}</h1>
      <InfiniteScroll
        dataLength={todos ? todos?.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        endMessage={
          <p className="text-green-400">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="p-4 flex flex-col items-center gap-4 flex-wrap justify-between">
          {todos &&
            todos.length > 0 &&
            todos.map((d: any, i: any) => (
              <div key={i} className="p-6 m-5 overflow-hidden bg-zinc-800">
                <h1 className="text-3xl">{d?.id}</h1>
                <h1>{d?.title}</h1>
                <h2>{d?.description}</h2>
                <button
                  onClick={() => updateTodo(d?.id)}
                  className="btn bg-green-400 m-2"
                >
                  update
                </button>
                <button
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteTodo(d?.id)}
                  className="btn bg-rose-500"
                >
                  {deleteMutation.isPending ? "deleting.." : "Delete"}
                </button>
              </div>
            ))}
          {isFetching && <h1>Is Fetching..........!</h1>}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FetchingTodo;
