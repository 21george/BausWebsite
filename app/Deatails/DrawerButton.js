"use client";
import React, { useEffect, useState } from "react";
import { getAboutme } from "../../../app/actions/aboutme/Getaboutme";
import meFoto from "../../../asset/images/IMG_0623.png";
import Image from "next/image";

export default function DrawerButton() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getAboutme();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex justify-center">
        <div className="animate-pulse flex space-x-4 w-full">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col overflow-hidden w-auto h-auto lg:flex-row lg:h-96">
        <div className="block h-full w-full lg:w-1/2">
          <Image
            src={meFoto.src}
            alt="Personal"
            className="w-full h-auto max-h-[300px] md:max-h-[400px] object-cover hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 p-6 md:p-12 dark:bg-gray-50 lg:w-1/2">
          <h3 className="text-2xl md:text-3xl font-bold">
            {data?.P_tittle || "Untitled"}
          </h3>
          <p className="my-4 md:my-6 dark:text-gray-600 line-clamp-3">
            {data?.personal_details || "No details available"}
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              className="bg-amber-950 w-full sm:w-40 h-10 sm:h-11 rounded-sm text-yellow-50 hover:bg-amber-900 transition-colors"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}