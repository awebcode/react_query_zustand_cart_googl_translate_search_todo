// counterStore.js
import create from "zustand";

type CounterT = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useCounterStore = create<CounterT>((set) => ({
  count: 1, // Starting count from 1
  increment: () =>
    set((state) => {
      if (state.count < 10) {
        return { count: state.count + 1 };
      } else {
        return { count: state.count }; // If count is already 10, do nothing
      }
    }),
  decrement: () =>
    set((state) => {
      if (state.count > 1) {
        return { count: state.count - 1 };
      } else {
        return { count: state.count }; // If count is already 1, do nothing
      }
    }),
  reset: () => set((state) => ({ count: 1 })),
}));

export default useCounterStore;
