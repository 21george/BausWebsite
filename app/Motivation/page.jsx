"use client";
import React from "react";
import WalkFoto from "../../asset/images/WayRoom.png";

export default function Moltivation() {
  return (
    <div className="relative w-full bg-white py-12 lg:py-16 dark:bg-white-100">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Left Column - Text */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-gray-800 italic">
                „Entweder du erkennst die Möglichkeit und zahlst den Preis oder du
                verstehst es nicht, erlebst die Konsequenz und zahlst später einen
                viel höheren Preis."    — Der Alchemist
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-1/2">
            <div className=" overflow-hidden shadow-lg">
              <img
                src={WalkFoto.src}
                alt="A motivational walk depiction"
                className="w-full h-auto max-h-[500px] responsive object-cover transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
