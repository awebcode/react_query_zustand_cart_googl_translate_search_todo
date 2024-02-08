"use client";
import {
  fethQueryData,
  fethTodoData,
  fethTodoDataWithoutInfinite,
} from "@/actions/queryActions";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const Todo_query = () => {
  const { data, error, isLoading, isFetching, isError } = useCustomQuery({
    queryKey: ["todos"],
    queryFn: fethTodoDataWithoutInfinite,
  });

  if (isLoading) {
    return <h1 className="text-white animate-pulse">Loading...</h1>;
  }
  if (isError) {
    return <h1 className="text-white">{error?.message}</h1>;
  }
  //never use isFetching
  console.log(data);
  return (
    <div>
      {" "}
      <h1>Total:{data?.total}</h1>
      <h1>Limit:{data?.limit}</h1>
      <div className="p-4 flex flex-col items-center gap-4 flex-wrap justify-between">
        {data?.todos &&
          data?.todos?.map((d: any, i: any) => (
            <div key={i} className="p-6 m-5 overflow-hidden">
              <h1>{d?.title}</h1>
              <h2>{d?.description}</h2>
            </div>
          ))}
        {isFetching && <h1>Is Fetching..........!</h1>}
      </div>
    </div>
  );
};

export default Todo_query;
