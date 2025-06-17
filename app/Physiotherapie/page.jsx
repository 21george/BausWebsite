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
        backgroundImageMobile={PhysiotherapieImage.src}
        title={articles[0]?.articles_tittle || "Physiotherapie"}
        titleStyles="text-2xl sm:text-3xl md:text-4xl font-bold"
        containerStyles="mb-8 md:mb-12"
      />
   <div className="bg-white py-12 sm:py-16 lg:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Blog Content Section */}
      <div className="w-full lg:w-2/3">
        <div className="prose prose-lg max-w-none text-gray-700">
          <ArticleSection articles={articles} onReadMore={handleReadMore} />
        </div>
      </div>

      {/* Sidebar/Image Section */}
      <div className="w-full lg:w-1/3">
        <div className="sticky top-8">
          <div 
            className="rounded-lg overflow-hidden bg-gray-50 p-4"
            role="img"
            aria-label="Motivational walk depiction"
          >
            <Image
              src={WomenWorld.src}
              alt="A woman practicing yoga"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </main>
  );
}
