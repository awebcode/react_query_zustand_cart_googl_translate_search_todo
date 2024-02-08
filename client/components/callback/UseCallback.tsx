"use client";
import React, { useState, useCallback } from "react";
import ChildCallback from "./Child";
import UseRef from "../ref/Ref";

const UseCallBack = () => {
  const [result, setResult] = useState<number>(0);
  const [number, setnumber] = useState<number>(0);
  console.log("callback rendering.....");
  const increase = useCallback(() => {
    setResult((prev: number) => prev + 1);
    console.log("increase render");
  }, [result]);

  const decrease = () => {
    setnumber((prev: number) => prev - 1);
    console.log("decrease render");
  };
  return (
    <div className="py-20 text-white">
      <h1>React UseCallBack</h1>
      <p>Result: {result}</p>

      <ChildCallback increase={increase} />
      <button className="btn bg-rose-400" onClick={() => decrease()}>
        Decrease
      </button>
      <UseRef />
    </div>
  );
};

export default UseCallBack;
