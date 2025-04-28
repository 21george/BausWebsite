"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllWorkdetails } from "../actions/worldetails/workdetails";
import image1 from "../../asset/images/Massag.png";
import image2 from "../../asset/images/IMG_3385.png";
import image3 from "../../asset/images/womenyoga.png";

const workImages = {
  1: image1,
  2: image2,
  3: image3,
};

export default function DetailsList({ id }) {
  const [datadetails, setDatadetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = id
          ? await getWorkdetailsById(id)
          : await getAllWorkdetails();

        if (!result.success) {
          if (result.status === 404) {
            setDatadetails([]);
            setError("The requested work detail was not found");
          } else {
            throw new Error(result.error);
          }
        } else {
          setDatadetails(id ? [result.data] : result.data);
        }
      } catch (err) {
        setError(err.message || "An error occurred while loading data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
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
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!datadetails.length) {
    return (
      <div className="flex justify-center">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex">
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
              <p className="text-sm text-blue-700">
                {id
                  ? "No work detail found with that ID"
                  : "No work details available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:p-6 space-y-6">
      {datadetails.map((details, index) => (
        <div
          key={details.id}
          className={`flex flex-col overflow-hidden w-auto h-auto lg:h-96 ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <Link
            href={`/detailslist/${details.id}`}
            className="block h-full lg:w-1/2"
          >
            {workImages[details.id] ? (
              <Image
                src={workImages[details.id]}
                alt={details.title || "Work detail image"}
                className="inset-0 w-full md:w-[800px] h-auto max-h-[400px]  object-cover hover:opacity-90 transition-opacity"
                priority={index < 3}
              />
            ) : (
              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </Link>

          <div className="flex flex-col justify-center flex-1 lg:p-12 sm:w-full lg:w-1/2">
            <h3 className="lg:text-3xl lg:font-bold  mt-5">
              {details.title || "Untitled Work"}
            </h3>
            <p className="my-6 dark:text-gray-600 line-clamp-3">
              {details.description || "No description available"}
            </p>
            <div className="flex space-x-4">
              <Link href={`/workdetails/${details.id}`}>
                <button
                  type="button"
                  className="bg-amber-950 w-40 h-11 rounded-sm text-yellow-50 hover:bg-amber-900 transition-colors"
                >
                  {details.buttontext || "Erfahre Mehr"}
                </button>
              </Link>
              {details.externalUrl && (
                <a
                  href={details.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-amber-950 w-40 h-11 rounded-sm text-amber-950 hover:bg-amber-50 transition-colors"
                >
                  Visit Project
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
