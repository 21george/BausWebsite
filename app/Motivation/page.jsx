"use client";
import React from "react";
import WalkFoto from "../../asset/images/WayRoom.png";

export default function Moltivation() {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-20 dark:bg-gray-100">
      <div className="flex flex-col max-w-4xl mx-auto overflow-hidden">
        <img
          src={WalkFoto.src}
          alt="A motivational walk depiction"
          className="w-full h-auto max-h-[500px] object-cover rounded-lg dark:bg-gray-500"
        />
        <div className="p-4 md:p-6 lg:p-8 pb-8 md:pb-12 mx-2 md:m-4 -mt-12 md:-mt-16 space-y-4 md:space-y-6 lg:max-w-3xl bg-white dark:bg-gray-50 rounded-md shadow-sm">
          <div className="space-y-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-snug md:leading-normal">
              „Entweder du erkennst die Möglichkeit und zahlst den Preis oder du
              verstehst es nicht, erlebst die Konsequenz und zahlst später einen
              viel höheren Preis.“
            </p>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              Der Alchemist
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
