"use client";
import { useParams, useRouter } from "next/navigation";
import { getWorkdetailsById } from "../../../app/actions/worldetails/workdetails";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroSection } from "../../components/HeroComponent/HeroSection";

import defaultImage1 from "../../../asset/images/Massag.png";
import defaultImage2 from "../../../asset/images/IMG_1572.jpg";
import defaultImage3 from "../../../asset/images/walfoto.png";
import defaultImage23 from "../../../asset/images/IMG_1195.jpg";

const defaultImages = {
  1: defaultImage1,
  2: defaultImage2,
  3: defaultImage3,
};

const secondaryImage = {
  2: defaultImage23,
  3: defaultImage3,
};

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 my-8">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );

  if (!detail)
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mx-4 my-8">
        <p className="text-blue-700">No detail found.</p>
      </div>
    );

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={defaultImages[detail.id]?.src || defaultImage1.src}
        title={detail.title || "Work Detail"}
        titleStyles="text-2xl sm:text-3xl md:text-4xl font-bold"
        containerStyles="mb-8 md:mb-12"
      />

      {/* Main Content */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Content Section */}
            <div className="w-full lg:w-2/3">
              <div className="prose prose-lg max-w-none text-gray-700">
                {detail.created_at && (
                  <p className="text-sm text-gray-800 mb-4">
                    Published on {new Date(detail.created_at).toLocaleDateString()}
                  </p>
                )}
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: detail.details?.replace(/\n/g, "<br />"),
                  }}
                />
                {detail.features && (
                  <section className="mt-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 mb-4">
                      Features
                    </h2>
                    <ul className="list-none space-y-2">
                      {detail.features.split("\n").map(
                        (feature, index) =>
                          feature.trim() && (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500">✔</span>
                              <span>{feature}</span>
                            </li>
                          )
                      )}
                    </ul>
                  </section>
                )}
                {detail.externalUrl && (
                  <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={detail.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                    >
                      Visit Project
                    </a>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar/Image Section */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-8 flex flex-col gap-6">
                {/* Cost Section */}
                <div className="rounded-lg overflow-hidden  p-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                    {detail.cost_header}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-2">
                    {detail.cost}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800">
                    {detail.coast_headerK}
                  </p>
                </div>

                {/* Additional Image */}
                <div
                  className="rounded-lg overflow-hidden  p-4"
                  role="img"
                  aria-label={detail.title || "Work detail image"}
                >
                  <Image
                    src={secondaryImage[detail.id]?.src || defaultImage1.src}
                    alt={detail.title || "Work detail"}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
