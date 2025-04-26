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
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto space-y-12"
    >
      {/* Main Feature Section */}
      <div className="bg-white p-4 sm:p-10 lg:p-12 w-full">
        <div className=" grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4">
            <div className="lg:max-w-lg">
              <dl className="space-y-4 text-base leading-7 text-gray-600">
                {[data[0]?.points, data[0]?.points_1, data[0]?.points_2].map(
                  (point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <p className="flex  w-auto text-sm sm:text-base lg:text-base text-gray-800">
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
    </motion.div>
  );
}
