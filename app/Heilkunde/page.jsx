"use client";
import { useEffect, useState } from "react";
import UnivasHero from "../../asset/images/walfoto.png";
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
        className="h-64 xs:h-72 sm:h-80 md:h-[30rem] lg:h-[38rem] xl:h-[40rem] 2xl:h-[45rem] flex items-center justify-center"
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
        className="bg-red-50 text-red-600 p-4 text-center max-w-4xl mx-auto rounded-lg"
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
      className="w-full"
    >
      <div className="flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10 px-4 xs:px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        {data[0]?.featursTittle && (
          <section className="w-full text-center space-y-8 md:space-y-10">
            <h2 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-2xl lg:text-3xl text-gray-800 px-2">
              {data[0].featursTittle}
            </h2>
            
            <HeilkundeSection />
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-10 w-full">
              {/* Image */}
              <div className="w-full lg:w-1/2 max-w-2xl">
                <div className="relative aspect-[4/3] w-full h-auto overflow-hidden shadow-md rounded-lg">
                  <Image
                    src={WomenWorld.src}
                    alt="A woman practicing yoga"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  />
                </div>
              </div>

              {/* Features List */}
              <ul className="w-full lg:w-1/2 max-w-2xl space-y-3 sm:space-y-2 md:space-y-1 text-gray-800">
                {[
                  data[0].features,
                  data[0].features_1,
                  data[0].features_2
                ].filter(Boolean).map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3  hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5"
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
                    <span className="prose max-w-none text-left text-gray-700 mb-1">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <HeilkundeGrid />
          </section>
        )}
      </div>
    </motion.div>
  );
}