"use client";
import React, { memo } from "react";
type Tincrease = {
  increase: () => void;
};
const ChildCallback: React.FC<Tincrease> = ({ increase }) => {
  console.log("child rendering...");
  return (
    <div className="text-white">
      <h1>ChildCallback </h1>
      <button className="btn bg-white" onClick={() => increase()}>
        Increase
      </button>
    </div>
  );
};

export default memo(ChildCallback);
