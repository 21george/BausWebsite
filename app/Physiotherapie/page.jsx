"use client";

import { useEffect, useState } from "react";
import PhysiotherapieImage from "../../asset/images/IMG_2950.png";
import { getPhysiotherapieD } from "../actions/Physiotherapie/GetPhysiotherapie";
import ArticleSection from "../components/ArticleSection/page";
import { HeroSection } from "../components/HeroComponent/page";
import PromoCards from "../components/ProductCards/page";

export default function Physiotherapie() {
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
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return (
    <>
      <HeroSection
        backgroundImage={PhysiotherapieImage.src}
        title={articles[0].articles_tittle}
        titleStyles="text-lg font-bold"
        containerStyles="mb-8"
      />
      <div className="conatiner mx-auto mt-12 mb-8">
      <ArticleSection />
      </div>
      <div className="flex flex-col items-center text-white md-12">
        <PromoCards/>
      </div>
    </>
  );
}
