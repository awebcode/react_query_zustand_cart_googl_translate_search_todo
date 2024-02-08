// counterStore.js
import { create } from "zustand";

type ProductT = {
  id: number|string;
  title: string;
  price: number;
  quantity: number;
  type?: "Decrement" | "Increment";
  stock:number
};

type CartT = {
  cart: ProductT[];
  total: number;
  message: {
    text: string;
    loading: boolean
  };
  addToCart: (item: ProductT) => void;
  removeToCart: (itemId: number|string) => void;
  resetCart: () => void;
};

//External function to calculate total
export const calculateTotal = (cart: ProductT[]) =>
  cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
const useCart = create<CartT>((set) => ({
  cart: [],
  total: 0,
  message: { text: "", loading: false },
  addToCart: (item) =>
    set((state) => {
      const updatedCart = state.cart.map((product) =>
        product.id === item.id
          ? {
              ...product,
              quantity:
                item.type === "Decrement"
                  ? product.quantity > 1
                    ? product.quantity - 1
                    : 1
                  : product.quantity < product.stock
                  ? product.quantity + 1
                  : product.quantity,
            }
          : product
      );

      const existingItem = state.cart.find((product) => product.id === item.id);
      const pushedNewItem = [...state.cart, { ...item, quantity: 1 }];

     
      return {
        cart: existingItem ? updatedCart : pushedNewItem,
        total: calculateTotal(existingItem ? updatedCart : pushedNewItem),
      };
    }),
  removeToCart: (itemId) =>
    set((state) => {
      const removedItem = state.cart.filter((item, i) => item.id !== itemId);
      return {
        cart: removedItem,
        total: calculateTotal(removedItem),
      };
    }),
  resetCart: () => set((state) => ({ cart: [], total: 0 })),
}));

export default useCart;
