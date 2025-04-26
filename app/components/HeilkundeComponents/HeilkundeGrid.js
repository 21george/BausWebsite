import { getHeilkundeInfo } from "../../actions/HeilkundeAction/GetHeilkunde";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeilkundeGrid = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getHeilkundeInfo();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-gray-500 p-4">Loading...</div>;
  }

  return (
    <section className="w-full flex flex-col items-center mt-2 mb-8 sm:mb-11 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full text-center space-y-4 max-w-6xl"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-10 px-2 sm:px-0">
          {data[0].Note_description}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[data[0].points, data[0].points_1, data[0].points_2].map(
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
            data[0].points1,
            data[0].points1_1,
            data[0].points1_2,
            data[0].points1_3,
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
                {data[0].points2}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeilkundeGrid;
