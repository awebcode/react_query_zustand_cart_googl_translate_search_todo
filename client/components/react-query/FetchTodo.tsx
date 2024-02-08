import { fethQueryData, fethTodoData } from "@/actions/queryActions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";
import FetchingTodo from "./FetchingTodo";

const FetchTodo = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["todos"],
    queryFn: fethTodoData,
    initialPageParam: 0,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FetchingTodo />
      </HydrationBoundary>
    </div>
  );
};

export default FetchTodo;
