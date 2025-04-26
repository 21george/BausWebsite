"use client";

import { useEffect, useState } from "react";
import { getHeilkundeInfo } from "../../actions/HeilkundeAction/GetHeilkunde";
import { motion } from "framer-motion";

export default function HeilkundeGrid() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getHeilkundeInfo();
        if (result.success) {
          setData(Array.isArray(result.data) ? result.data : [result.data]);
        } else {
          setError(result.error || "Failed to load data");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-red-500 p-4 text-center"
        role="alert"
        aria-live="assertive"
      >
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 max-w-7xl mx-auto"
    >
      {[data[0]?.points, data[0]?.points_1, data[0]?.points_2].map(
        (point, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
                {point}
              </p>
            </div>
          </div>
        )
      )}

      {[
        data[0]?.points1,
        data[0]?.points1_1,
        data[0]?.points1_2,
        data[0]?.points1_3,
      ].map((point, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
              {point}
            </p>
          </div>
        </div>
      ))}

      <div className="p-4 sm:p-6 shadow-sm md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
            {data[0]?.points2}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
