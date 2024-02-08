"use client";
import { fethQueryData } from "@/actions/queryActions";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const Fetch = () => {
  const { data, error, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["products"],

      queryFn: fethQueryData,

      getNextPageParam: (lastPage: any) => {
        const { prevOffset, total, limit } = lastPage;

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

  const products = data?.pages.flatMap((page) => page?.products);
  // const articles = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.articles];
  // }, []);
  if (isLoading) {
    return <h1 className="text-white animate-pulse">Loading...</h1>;
  }
  if (isError) {
    return <h1 className="text-white">{error?.message}</h1>;
  }
  console.log("render");
  console.log("products", products);
  console.log({ hasNextPage, fetchNextPage });
  //never use isFetching
  console.log(data?.pages[0]);
  return (
    <div>
      {" "}
      <h1>Total:{data?.pages[0]?.total}</h1>
      <h1>Skip:{data?.pages[data?.pages.length - 1]?.skip}</h1>
      <h1>Limit:{data?.pages[0]?.limit}</h1>
      <InfiniteScroll
        dataLength={products ? products?.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>Loading...</div>}
        endMessage={
          <p className="text-green-400">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="p-4 flex items-center gap-4 flex-wrap justify-between">
          {products &&
            products.map((d: any, i: any) => (
              <div key={i} className="p-6 m-5 overflow-hidden">
                <h1>{d.title}</h1>
                <h2>{d.description}</h2>
              </div>
            ))}
          {isFetching && <h1>Is Fetching..........!</h1>}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Fetch;
