"use client";
import useOutsideclick from "@/hooks/useOutsideclick";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { GiTireIronCross } from "react-icons/gi";
import { HiMenu } from "react-icons/hi"; // Updated icon name
import { HiBars2 } from "react-icons/hi2";

import serviceworker from "./app.Worker.ts"; // Import the web worker file with "?worker" suffix
import WebWorker from "./WebWorker";
const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
   const worker:any = new WebWorker(serviceworker);
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];
  const callback = () => {
    setOpenDrop(false);
  };
  useOutsideclick({ ref, callback });

  const countHandler = () => {
   

  
      worker.onmessage = (event: any) => {
        const { type, payload } = event.data;
        console.log("type, payload", type, payload);

        if (type === "result") {
          setTotal(payload);
          worker.terminate();
        }
      };

      const numberToCompute = 1000000000*Math.random(); // Replace with your desired number
      worker.postMessage({ type: "compute", payload: numberToCompute });
   
  };

  return (
    <div className="py-4 w-full fixed z-10 top-0 left-0 right-0 bg-slate-100 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-5xl">Todos {total}</h1>
          </div>

          <div
            className={`md:flex md:items-center gap-4 md:pb-0 pb-12 absolute md:static md:opacity-100 opacity-0  z-20 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ${
              open
                ? "top-12 opacity-100  flex flex-col gap-4 bg-slate-100"
                : "top-[-350px]"
            }`}
          >
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className="block w-6/6 bg-green-500 md:bg-transparent md:text-zinc-900 mr-2 md:m-0 text-center hover:bg-yellow-500 p-3 text-white rounded duration-300 transition-all ease-linear"
              >
                {link.name}
              </Link>
            ))}
            {/* dropdown start */}
            <div className="relative">
              <button
                onClick={(e) => {
                  setOpenDrop((prev) => !prev);
                }}
                onMouseOver={(e) => {
                  setTimeout(() => {
                    setOpenDrop(true);
                  }, 100);
                }}
                className="btn w-full flexCenter mr-2 bg-black text-white hover:bg-gray-800 hover:text-white"
              >
                Dropdown
                <BiCaretDown />
              </button>
              <div
                ref={ref}
                className={`absolute  rounded-bl-3xl rounded-tr-3xl  top-12 m-2 inline-flex flex-col gap-3 bg-white w-full h-fit transition-all  duration-500 ease-in-out  ${
                  openDrop ? "opacity-100 h-full bg-white" : "opacity-0 max-h-0"
                } `}
              >
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.path}
                    className="block w-6/6  mr-2 md:m-0 text-center hover:bg-yellow-500 p-3 text-zinc-600 rounded duration-300 transition-all ease-linear"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={() => countHandler()}
              className="btn mr-2 bg-black text-white hover:bg-gray-800 hover:text-white"
            >
              CountNumber
            </button>
            <button className="btn mr-2 bg-black text-white hover:bg-gray-800 hover:text-white">
              Signin
            </button>
          </div>

          <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <GiTireIronCross className="h-7 w-7" />
            ) : (
              <HiBars2 className="h-7 w-7" />
            )}
          </div>
        </div>

        {/* Mobile Menu with transition */}
        {/* <ul
          className={`${
            open ? "max-h-screen opacity-100 flex flex-col gap-6 ml-2" : "max-h-0 opacity-0"
          } md:hidden transition-all ease-in-out duration-300 overflow-hidden`}
        >
          {links.map((link, i) => (
            <li key={i} className="py-2">
              <Link href={link.path}>
                <span className="text-gray-700 hover:text-gray-800 hover:bg-green-100 rounded-lg duration-300 transition-all ease-linear w-full px-8 py-2">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
          <li className="py-2">
            <button className="btn bg-black text-white hover:bg-gray-800 hover:text-white">
              Signin
            </button>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Navbar;
