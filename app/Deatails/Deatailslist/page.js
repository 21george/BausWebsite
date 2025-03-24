"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

async function getDialoBlog() {
  const res = await fetch("http://localhost:3001/workdetails", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch workdetails:", res.status);
    return [];
  }

  return res.json();
}

export default function DeatailsList() {
  const [datadetails, setDatadetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getDialoBlog();
      setDatadetails(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {datadetails.map((details, index) => (
        <div
          key={details.id}
          className={`flex flex-col overflow-hidden rounded-md shadow-sm h-auto lg:h-96 
                        ${
                          index % 2 !== 0
                            ? "lg:flex-row-reverse"
                            : "lg:flex-row"
                        }`}
        >
          <img
            src={details.image}
            alt={`Image ${details.id}`}
            className="h-auto dark:bg-gray-500 bg-fixed aspect-video"
          />
          <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
            <h3 className="text-3xl font-bold">{details.title}</h3>
            <p className="my-6 dark:text-gray-600">{details.description}</p>
            <Link href={`/workdetails/${details.id}`}>
              <button
                type="button"
                className="self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50"
              >
                {details.buttonText || "Read More"}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}