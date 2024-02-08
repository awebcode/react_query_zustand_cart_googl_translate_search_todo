"use client";
import useCounterStore from "@/hooks/useCounter";
import React from "react";

const Counter = () => {
  const { increment, decrement, count,reset } = useCounterStore();
  console.log("render");
  return (
    <div>
      <h1 className="text-white"> Counter:{count}</h1>
      <button onClick={() => increment()} className="btn bg-green-400">
        Increment
      </button>
      <button onClick={() => decrement()} className="btn bg-rose-400">
        Decrement
      </button>
      <button onClick={() => reset()} className="btn bg-rose-400">
        Reset
      </button>
    </div>
  );
};

export default Counter;
