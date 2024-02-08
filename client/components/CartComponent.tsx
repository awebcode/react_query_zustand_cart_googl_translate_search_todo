"use client";
import useCart from "@/hooks/useCart";
// ProductList.js
import React, { useId } from "react";

const ProductList = () => {
  const { addToCart, removeToCart, cart, total, resetCart } = useCart();
  //initProducts
  const products = [
    { id: useId(), title: "Product 1", price: 10, quantity: 0, stock: 5 },
    { id: useId(), title: "Product 2", price: 20, quantity: 0, stock: 2 },
    { id: useId(), title: "Product 3", price: 15, quantity: 0, stock: 4 },
    { id: useId(), title: "Product 4", price: 25, quantity: 0, stock: 3 },
    { id: useId(), title: "Product 5", price: 30, quantity: 0, stock: 9 },
  ];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 rounded">
            <h1>Id {product.id}</h1>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500">Price: ${product.price}</p>
            <h3 className="text-lg font-semibold">Stock:{product.stock}</h3>
            {/* {console.log("cart", cart)}
            {console.log("product", product)} */}
            <button
              className={`${
                cart.some((item) => item.id === product.id)
                  ? "bg-gray-500"
                  : "bg-blue-500"
              } text-white px-4 py-2 mt-2 rounded`}
              disabled={!!cart.find((item) => item.id === product.id)}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            {cart.some((item) => item.id === product.id) && (
              <button
                className="bg-rose-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => addToCart(product)}
              >
                Remove From Cart
              </button>
            )}
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white">Total Price: ${total}</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            onClick={() => resetCart()}
          >
            Remove All
          </button>
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">Shopping Cart</h2>
      <div className="grid grid-cols-2 gap-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 rounded">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <h2 className="text-lg font-semibold">Stock:{item.stock}</h2>
            <p className="text-gray-500">Price: ${item.price * item.quantity}</p>
            <div className="flex gap-1">
              <button
                onClick={() => addToCart(item)}
                className="bg-zinc-500 text-white p-2 rounded-full"
              >
                +
              </button>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <button
                onClick={() => addToCart({ ...item, type: "Decrement" })}
                className="bg-zinc-500 text-white p-2 rounded-full"
              >
                -
              </button>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              onClick={() => removeToCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
