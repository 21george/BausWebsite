"use client";
import { useEffect, useState } from "react";
import UnivasHero from "../../asset/images/image0.jpeg";
import HeilkundeGrid from "../components/HeilkundeComponents/HeilkundeGrid";
import HeilkundeSection from "../components/HeilkundeComponents/HeilkundeSection";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import { getHeilkundeInfo } from "../actions/HeilkundeAction/GetHeilkunde";
import WomenWorld from "../../asset/images/IMG_7534.png";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Heilkunde() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection
        backgroundImage={UnivasHero.src}
        className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center"
        title="Heilkunde für Frauen"
        description=""
        aria-label="Main hero section"
      />
      <DynamicSections />
    </main>
  );
}

function DynamicSections() {
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
      className="text-center space-y-4"
    >
      <div className="flex flex-col justify-center ml-20 items-center gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        {data[0]?.featursTittle && (
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {data[0].featursTittle}
            </h2>
            <HeilkundeSection />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-6">
              {/* Image on the left */}
              <div className="flex-shrink-0 w-full md:w-1/2">
                <Image
                  src={WomenWorld.src}
                  alt="A woman practicing yoga"
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[400px] object-cover"
                  priority
                />
              </div>

              {/* List on the right */}
              <ul className="w-full md:w-1/2 mt-6 md:mt-0 space-y-4 text-gray-800">
                {data.map((item, index) =>
                  item.features ? (
                    <li
                      key={`${index}-feature`}
                      className="flex items-center justify-start gap-2"
                    >
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
                      <span className="text-sm sm:text-base">
                        {item.features}
                      </span>
                    </li>
                  ) : null
                )}
                {data.map((item, index) =>
                  item.features_1 ? (
                    <li
                      key={`${index}-feature1`}
                      className="flex items-center justify-start gap-2"
                    >
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
                      <span className="text-sm sm:text-base">
                        {item.features_1}
                      </span>
                    </li>
                  ) : null
                )}
                {data.map((item, index) =>
                  item.features_2 ? (
                    <li
                      key={`${index}-feature2`}
                      className="flex items-center justify-start gap-2"
                    >
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
                      <span className="text-sm sm:text-base">
                        {item.features_2}
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <HeilkundeGrid />
          </section>
        )}
      </div>
    </motion.div>
  );
}
