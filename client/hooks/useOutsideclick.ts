"use client";
import { RefObject, useEffect } from "react";

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement | HTMLDivElement>;
  callback: () => void;
}

const useOutsideClick = ({ ref, callback }: UseOutsideClickProps) => {
    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
