"use client";
import { useParams, useRouter } from "next/navigation";
import { getWorkdetailsById } from "../../../app/actions/worldetails/workdetails";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

import defaultImage1 from "../../../asset/images/Massag.png";
import defaultImage2 from "../../../asset/images/IMG_3385.png";
import defaultImage3 from "../../../asset/images/InerselfTuch.png";
import { HeroSection } from "../../components/HeroComponent/HeroSection";

const defaultImages = {
  1: defaultImage1,
  2: defaultImage2,
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
          // Redirect to 404 page if desired
          // router.push('/not-found');
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-4"
    >
      <main className="ovlerflow-hidden">
        <HeroSection
          backgroundImage={defaultImages.src}
          className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center"
          title="Heilkunde für Frauen"
          description=""
          aria-label="Main hero section"
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                href="/workdetails"
                className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to all work details
              </Link>
            </div>

            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={defaultImages[detail.id] || defaultImage1}
                  alt={detail.title || "Work detail"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="md:p-8">
                <header className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {detail.title}
                  </h1>
                  {detail.created_at && (
                    <p className="text-sm text-gray-500">
                      Published on{" "}
                      {new Date(detail.created_at).toLocaleDateString()}
                    </p>
                  )}
                </header>

                <div className="prose max-w-none text-gray-700 mb-8">
                  {detail.description && (
                    <div
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: detail.description.replace(/\n/g, "<br />"),
                      }}
                    />
                  )}
                </div>

                {detail.externalUrl && (
                  <div className="mt-8">
                    <a
                      href={detail.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                    >
                      Visit Project
                      <FiExternalLink className="ml-2" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
