import { fethQueryData } from "@/actions/queryActions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";
import Fetch from "./Fetch";

const Fething = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: fethQueryData,
    initialPageParam: 0,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Fetch />
      </HydrationBoundary>
    </div>
  );
};

export default Fething;
