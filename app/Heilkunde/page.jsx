"use client";
import { useEffect, useState } from "react";
import UnivasHero from "../../asset/images/image0.jpeg";
import HeilkundeGrid from "../components/HeilkundeComponents/HeilkundeGrid";
import HeilkundeSection from "../components/HeilkundeComponents/HeilkundeSection";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import { getHeilkundeInfo } from "../actions/HeilkundeAction/GetHeilkunde";
import WomenWorld from "../../asset/images/womenyoga.png";
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
  const [sectionContent, setSectionContent] = useState("");
  const [featursTittle, setFeatursTittle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getHeilkundeInfo();
        if (result.success) {
          setData(Array.isArray(result.data) ? result.data : [result.data]);
          setSectionContent(result.data?.SectionContent || ""); 
          setFeatursTittle(result.data?.featursTittle || ""); 
        } else {
          setError(result.error || "Failed to load data");
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
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

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No data available
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
      {/* Main Content Container */}
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        
        {/* Features Title Section */}
        {featursTittle && (
          <section 
            className="leading-loose text-center"
            aria-labelledby="features-title"
          >
            <h2 
              id="features-title"
              className="text-xl sm:text-2xl md:text-3xl font-sans text-gray-900 px-2"
            >
              {featursTittle}
            </h2>
          </section>
        )}

        {/* Features List Section */}
        <section 
          className="mt-6 md:mt-8 w-full max-w-4xl mx-auto px-2 sm:px-4"
          aria-labelledby="features-list-title"
        >
          <h2 
            id="features-list-title"
            className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 mb-4 md:mb-6"
          >
            Features
          </h2>
          
          <ul className="mt-4 md:mt-6 space-y-3 md:space-y-4 text-base md:text-lg text-gray-800">
            {data.map((item, index) => (
              item.features && (
                <li key={index} className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2 sm:ml-3">{item.features}</span>
                </li>
              )
            ))}
          </ul>
        </section>

        {/* Heilkunde Section */}
        <HeilkundeSection />
        
        {/* Image Section */}
        <div 
          className="flex justify-center items-center w-full mx-auto p-4 sm:p-6 md:p-10 lg:p-12"
          role="img"
          aria-label="Motivational walk depiction"
        >
          <div className="flex flex-col w-full max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-hidden rounded-lg">
            <Image
              src={WomenWorld.src}
              alt="A woman practicing yoga"
              width={800}
              height={600}
              className="w-full md:w-[400px] h-auto max-h-[400px] object-cover mx-auto"
              priority
            />
          </div>
        </div>
        
        {/* Grid Section */}
        <HeilkundeGrid />
      </div>
    </motion.div>
  );
}



