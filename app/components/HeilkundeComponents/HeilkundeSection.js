import React, { useEffect, useState } from "react";
import { getHeilkundeInfo } from "../../actions/HeilkundeAction/GetHeilkunde";
import { motion } from "framer-motion";

const HeilkundeSection = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const result = await getHeilkundeInfo();
        
        if (!isMounted) return;

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to load data");
        }
      } catch (err) {
        if (isMounted) {
          setError("An unexpected error occurred");
          console.error("Fetch error:", err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section 
        className="flex flex-col h-full w-full items-center mt-4 mb-12 px-4 sm:px-6 lg:px-8"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center space-y-6 max-w-4xl">
          <p className="text-gray-600">Loading content...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="flex flex-col h-full w-full items-center mt-4 mb-12 px-4 sm:px-6 lg:px-8"
        role="alert"
      >
        <div className="flex justify-center items-center h-64 text-red-500 text-center">
          Error: {error}. Please try again later.
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="flex flex-col h-full w-full items-center mt-4 mb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl">
          <p className="text-gray-600">No content available</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="flex flex-col h-full w-full items-center mt-4 mb-12 px-4 sm:px-6 lg:px-8"
      aria-labelledby="heilkunde-section-heading"
    >
      <h2 id="heilkunde-section-heading" className="sr-only">Heilkunde Information</h2>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-6 max-w-4xl">
        {data.map((item, index) => (
          <p
            key={`heilkunde-para-${index}`}
            className="text-gray-800 justify-between flex text-sm sm:text-base lg:text-sm leading-relaxed mb-4"
          >
            {item.paragraphs}
          </p>
        ))}
      </motion.div>
    </section>
  );
};

export default HeilkundeSection;