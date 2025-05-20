"use client";
import { useParams, useRouter } from "next/navigation";
import { getWorkdetailsById } from "../../../app/actions/worldetails/workdetails";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { HeroSection } from "../../components/HeroComponent/HeroSection";

import defaultImage1 from "../../../asset/images/Massag.png";
import defaultImage2 from "../../../asset/images/Bausyoga.png";
import defaultImage3 from "../../../asset/images/walfoto.png";
import defaultImage23 from "../../../asset/images/YogaClass.png";

const defaultImages = {
  1: defaultImage1,
  2: defaultImage2,
  3: defaultImage3,
};

const secondaryImage = {
  2: defaultImage23,
  3: defaultImage3
}

export default function WorkDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        const result = await getWorkdetailsById(id);

        if (result.success) {
          setDetail(result.data);
        } else {
          setError(result.error || "Detail not found");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
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
                <h3 className="text-lg font-medium text-red-800">
                  Error loading work detail
                </h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <button
                  onClick={() => router.push("/workdetails")}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Back to Work Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-800">
                  No detail found
                </h3>
                <p className="mt-2 text-sm text-blue-700">
                  The requested work detail could not be found.
                </p>
                <button
                  //onClick={() => router.push('/workdetails')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Back to Work Details
                </button>
              </div>
            </div>
          </div>
        </div>
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
      {/* Hero Section */}
      <HeroSection
        backgroundImage={defaultImages[detail.id] || defaultImage1}
        className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center"
        title={detail.title || "Work Detail"}
        description=""
        aria-label="Main hero section"
      />

      {/* Main Content Container */}
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="flex items-center justify-center w-fit mx-auto text-amber-600 hover:text-amber-800 transition-colors"
        ></motion.button>

        {/* Content Section */}
        <section className="w-full max-w-4xl mx-auto px-2 sm:px-4">
          <header className="mb-8">
            {detail.created_at && (
              <p className="text-sm text-gray-800">
                Published on {new Date(detail.created_at).toLocaleDateString()}
              </p>
            )}
          </header>

          {/* Description */}
          <div className="prose max-w-none text-left text-gray-700 mb-8">
            {detail.details && (
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: detail.details.replace(/\n/g, "<br />"),
                }}
              />
            )}
          </div>

          {/* Features Section */}
          {detail.features && (
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 mb-6">
                Features
              </h2>

              <ul className="mt-4 space-y-3 text-base text-gray-800 text-left">
                {detail.features.split("\n").map(
                  (feature, index) =>
                    feature.trim() && (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5"
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
                        <span className="ml-3">{feature}</span>
                      </motion.li>
                    )
                )}
              </ul>
            </section>
          )}
          {/* External Link Button */}
          {detail.externalUrl && (
            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={detail.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Visit Project
                <FiExternalLink className="ml-2" />
              </a>
            </motion.div>
          )}
        </section>

        {/* Additional Image */}
        <motion.div
          className="flex justify-center w-full mx-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full max-w-2xl overflow-hidden ">
            <Image
              src={secondaryImage[detail.id] || defaultImage1}
              alt={detail.title || "Work detail"}
              width={800}
              height={600}
              className="w-full md:w-[400px] h-auto max-h-[400px] object-cover mx-auto"
              priority
            />
          </div>
          <div className="flex flex-col justify-center w-full items-start text-left m-6">
            <h1 className="text-gl">{detail.cost_header}</h1>
            <p className="text-ml text-gray-800 md:text-2ml mb-2">
              {detail.cost}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
