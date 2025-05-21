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
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {articles.map((article, index) => (
          <article 
            key={article.id || index}
            className="p-2 sm:p-8"
          >
            <header className="mb-6">
              {/*<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {article.title || "Physiotherapy Insights"}
              </h2>}
              {/*<div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">Published on {new Date(article.date || new Date()).toLocaleDateString()}</span>
                <span>By Nikolina Baus</span>
              </div>*/}
            </header>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              {article.ADeatails.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <footer className="mt-8 pt-4 border-t ">
              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag, i) => (
                 {/* <span 
                    key={i} 
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>*/}
                ))}
              </div>
            </footer>
          </article>
        ))}
      </motion.div>
    </section>
  );
}