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
      className="px-4 py-8 mx-auto w-full"
    >
      {/* Responsive Grid Layout - single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Section */}
        <div className="bg-white w-full">
          <div className="grid grid-cols-1 gap-x-4 w-full">
            <div className="pt-2 lg:pt-4">
              <div className="w-full">
                <dl className="space-y-3 text-base leading-7 text-gray-600">
                  {[data[0]?.points, data[0]?.points_1, data[0]?.points_2].map(
                    (point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-row items-start gap-2"
                      >
                        <div className="flex-shrink-0 pt-0.5">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
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
                        </div>
                        <p className="text-xs sm:text-xs text-gray-800">
                          {point}
                        </p>
                      </motion.div>
                    )
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white w-full">
          <div className="grid grid-cols-1 gap-x-4 w-full">
            <div className="pt-2 lg:pt-4">
              <div className="w-full">
                <dl className="space-y-3 text-base leading-7 text-gray-600">
                  {[
                    data[0]?.points1,
                    data[0]?.points1_1,
                    data[0]?.points1_2,
                    data[0]?.points1_3,
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-row items-start gap-2"
                    >
                      <div className="flex-shrink-0 pt-0.5">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
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
                      </div>
                      <p className="text-xs sm:text-xs text-gray-800">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - full width */}
      <div className="bg-white w-full mt-6">
        <div className="grid grid-cols-1 gap-x-4 w-full">
          <div className="pt-2 lg:pt-4">
            <div className="w-full">
              <div className="space-y-3 text-base leading-7 text-gray-600">
                {[data[0]?.points2, data[0]?.points2_1, data[0]?.points2_2].map(
                  (points2, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-row items-start gap-2"
                    >
                      <div className="flex-shrink-0 pt-0.5">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
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
                      </div>
                      <p className="text-xs sm:text-xs text-gray-800">
                        {points2}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
