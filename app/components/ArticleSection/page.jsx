"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ArticleSection() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/articles/1")
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6  pb-24 lg:px-8 py-16 rounded-lg">
      {article?.content.map((paragraph, index) => (
        <p key={index} className="dark:text-gray-600 text-base md:text-base lg:text-lg mb-4">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
