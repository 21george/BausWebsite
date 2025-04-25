"use client";
import { useEffect, useState } from "react";
import PhysiotherapieImage from "../../asset/images/IMG_2931.png";
import WomenWorld from "../../asset/images/Massag.png";
import { getPhysiotherapieD } from "../actions/Physiotherapie/GetPhysiotherapie";
import ArticleSection from "../components/ArticleSection/page";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Physiotherapie() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleReadMore = (articleId) => {
    router.push(`/physiotherapie/${articleId}`);
  };

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

  return (
    <main className="overflow-x-hidden">
      <HeroSection
        backgroundImage={PhysiotherapieImage.src}
        title={articles[0]?.articles_tittle || "Physiotherapie"}
        titleStyles="text-2xl sm:text-3xl md:text-4xl font-bold"
        containerStyles="mb-8 md:mb-12"
      />

      <div className="container justify-between flex-1 mx-auto mt-8 md:mt-10 mb-6 md:mb-10 px-4 sm:px-6">
        <ArticleSection articles={articles} onReadMore={handleReadMore} />
      </div>

      <div
        className="flex justify-center items-center w-full mx-auto p-4 sm:p-6 md:p-10 lg:p-12"
        role="img"
        aria-label="Motivational walk depiction"
      >
        <div className="flex flex-col w-full  mt-1 max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={WomenWorld.src}
            alt="A woman practicing yoga"
            width={800}
            height={600}
            className="w-full md:w-[400px] h-auto max-h-[400px] object-cover mx-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}
