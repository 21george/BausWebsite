"use client";
import React from "react";
import WalkFoto from "../../asset/images/WayRoom.png";
import { motion } from "framer-motion";

export default function Moltivation() {
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <motion.dev
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <img
            src={WalkFoto.src}
            alt="A motivational walk depiction"
            className="w-full h-auto max-h-[500px] object-cover dark:bg-gray-500"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
            <div className="space-y-2">
              <p className="text-1xl font-semibold sm:text-2xl">
                „Entweder du erkennst die Möglichkeit und zahlst den Preis oder
                du verstehst es nicht, erlebst die Konsequenz und zahlst später
                einen viel höheren Preis.“
              </p>
              <h2 className="text-2xl">Der Alchemist</h2>
            </div>
          </div>
        </motion.dev>
      </div>
    </div>
  );
}
