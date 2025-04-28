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
    <section className="w-full mx-auto px-4 sm:px-6 pb-12 md:pb-24 lg:px-8 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        {articles.map((article, index) => (
          <p
            key={article.id || index}
            className="flex  justify-center dark:text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed md:leading-relaxed px-2 sm:px-4"
          >
            {article.ADeatails}
          </p>
        ))}
      </motion.div>
    </section>
  );
}