"use client";
import { useRef } from "react";

export default function UseRef() {
  console.log("render ref");
  const counterRef = useRef(0);
  const counterPlaceholderRef = useRef<HTMLElement | null>(null);

  const increase = () => {
    counterRef.current++;
    updateCounterText(); // Update the DOM directly
  };

  const updateCounterText = () => {
    const counterElement = counterPlaceholderRef.current;
    if (counterElement) {
      counterElement.textContent = `Count: ${counterRef.current}`;
    }
  };

  return (
    <div className="text-white">
      <h1 ref={counterPlaceholderRef} id="counter">
        Count: {counterRef.current}
      </h1>
      <button onClick={() => increase()} className="btn bg-white">
        Increase
      </button>
    </div>
  );
}
