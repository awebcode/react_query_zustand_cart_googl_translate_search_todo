// App.tsx
"use client"
import React, { useState, useMemo } from "react";

const UseMemo: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  // Use useMemo to memoize the result of the heavy computation
  const heavyComputationResult = useMemo(() => {
    const numberToCompute = 100000000000; // Replace with your desired number

    // Perform the heavy computation (e.g., calculating the sum of numbers)
    let sum = 0;
    for (let i = 0; i <= numberToCompute; i++) {
      sum += i;
    }

    return sum;
  }, []); // Empty dependency array ensures that the computation is done only once

  const handleCompute = () => {
    setResult(heavyComputationResult);
  };

  return (
    <div className="py-40 text-white" >
      <h1>React UseMemo with Heavy Computation</h1>
      <button className="btn bg-white" onClick={handleCompute}>Compute</button>
      {result !== null && <p className="text-white">Result: {result}</p>}
    </div>
  );
};

export default UseMemo;
