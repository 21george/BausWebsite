import React, { useEffect, useState } from "react";
import { getHeilkundeInfo } from "../../actions/HeilkundeAction/GetHeilkunde";
import { motion } from "framer-motion";

const HeilkundeSection = () => {
  const [data, setData] = useState([]);
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
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full w-full items-center mt-4 mb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-4xl"
      >
        {data.map((item, index) => (
          <p
            key={index}
            className="text-gray-800 dark:text-gray-500 justify-between flex text-sm sm:text-base lg:text-lg leading-relaxed mb-4"
          >
            {item.paragraphs}
          </p>
        ))}
      </motion.div>
    </section>
  );
};

export default HeilkundeSection;
