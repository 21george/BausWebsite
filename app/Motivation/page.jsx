import React from "react";
import WalkFoto from "../../asset/images/WayRoom.png";
import { motion } from "framer-motion";

export default function Moltivation() {
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 lg:p-20 dark:bg-gray-100">
      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden">
        <img
          src={WalkFoto.src}
          alt="A motivational walk depiction"
          className="w-full h-auto max-h-[500px] object-cover rounded-lg dark:bg-gray-500"
        />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-3xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
          <div className="space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              „Entweder du erkennst die Möglichkeit und zahlst den Preis oder du
              verstehst es nicht, erlebst die Konsequenz und zahlst später einen
              viel höheren Preis.“
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Der Alchemist
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
