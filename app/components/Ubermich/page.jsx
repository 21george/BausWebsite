"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ÜberMich() {
  const [aboutData, setAboutData] = useState({
    description: "",
    images: [],
  });

  useEffect(() => {
    // Fetch data from the JSON server
    axios
      .get("http://localhost:3001/about")
      .then((response) => {
        setAboutData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="relative mt-20 mb-11 w-full h-a">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          {/* Description Section */}
          <div className="sm:max-w-lg">
            <h1 className="text-4xl tracking-tight text-gray-900 sm:text-6xl">
              Ubermich
            </h1>
            <p className="mt-4 text-sl text-gray-400">
              {aboutData.description}
            </p>
          </div>

          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute# lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {[0, 1, 2].map((colIndex) => (
                    <div
                      key={colIndex}
                      className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                    >
                      {aboutData.images
                        .slice(colIndex * 2, colIndex * 2 + 2)
                        .map((image, index) => (
                          <div
                            key={index}
                            className="h-64 w-44 overflow-hidden rounded-lg"
                          >
                            <img
                              src={image.src}
                              alt={`Image ${index + 1}`}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
