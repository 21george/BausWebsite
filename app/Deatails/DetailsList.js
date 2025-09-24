"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllWorkdetails } from "../actions/worldetails/workdetails";
import image1 from "../../asset/images/doors.JPG";
import image2 from "../../asset/images/IMG_3385.png";
import image3 from "../../asset/images/IMG_1165.jpg";

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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse flex flex-col space-y-4 w-full max-w-2xl p-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-xl">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!datadetails.length) {
    return (
      <div className="flex justify-center p-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 w-full max-w-xl">
          <p className="text-sm text-blue-700">
            {id ? "No work detail found with that ID" : "No work details available"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-8">
      {datadetails.map((details, index) => (
        <div
          key={details.id}
          className={`flex flex-col lg:flex-row ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          } items-center gap-6`}
        >
          {/* Image */}
          {/* Image */}
<div className="w-full lg:w-1/2 flex justify-center">
  {workImages[details.id] ? (
    <Image
      src={workImages[details.id]}
      alt={details.title || "Work detail image"}
      width={500}
      height={500}
      className="w-full lg:w-[81%] max-h-[30%] hover:opacity-90 transition-opacity"
      priority={index < 3}
    />
  ) : (
    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
      <span className="text-gray-500">No Image Available</span>
    </div>
  )}
</div>


          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">{details.title || "Untitled Work"}</h3>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              {details.description || "No description available"}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/workdetails/${details.id}`}>
                <button className="px-6 py-3 border-2 border-amber-950 text-gray-700 hover:bg-amber-950 hover:text-white transition-all duration-300 font-medium text-sm sm:text-base rounded">
                  {details.buttontext || "Erfahre Mehr"}
                </button>
              </Link>
              {details.externalUrl && (
                <a
                  href={details.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-amber-950 text-amber-950 hover:bg-amber-50 transition-all duration-300 font-medium text-sm sm:text-base rounded"
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
