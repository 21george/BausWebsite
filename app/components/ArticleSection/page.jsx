"use client";
import React, { useEffect, useState } from "react";
import { getPhysiotherapieD } from "../../actions/Physiotherapie/GetPhysiotherapie";
import { motion } from "framer-motion";

export default function ArticleSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await getPhysiotherapieD();
        if (result.success) {
          setArticles(result.data);
        } else {
          setError(result.error || "Failed to fetch articles");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:px-8 py-16 text-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:px-8 py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full w-full items-center mt-8 mb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        {articles.map((article, index) => (
          <p
            key={article.id || index}
            className="text-gray-800 justify-between flex text-sm sm:text-base lg:text-sm leading-relaxed mb-4"
          >
            {article.ADeatails}
          </p>
        ))}
      </motion.div>
    </section>
  );
}