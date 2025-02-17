"use client";

import { Suspense } from "react";
import HeroSection from "../components/HeroComponent/page";
import PhysiotherapieImage from "../../asset/images/IMG_2950.png";
import ProductCard from "../components/ProductCards/page";
import ArticleSection from "../components/ArticleSection/page";

const cardsData = [
  {
    id: 1,
    title: "Yorga",
    description: "Trendy and stylish clothing.",
    videoSrc: "/videos/video1.mp4",
  },
  {
    id: 2,
    title: "Begginer Yorga class",
    email: "summer@fashion.com",
    videoSrc: "/videos/video2.mp4",
  },
];

export default function Physiotherapie() {
  return (
    <>
      <HeroSection
        backgroundImage={PhysiotherapieImage.src}
        title="Physiotherapie"
        titleStyles="text-lg font-bold"
        containerStyles="mb-8"
      />
      <ArticleSection />

      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {cardsData.map((card) => (
          <Suspense fallback={<p>Laoding...video</p>}>
            <ProductCard
              key={card.id}
              title={card.title}
              videoSrc={card.videoSrc}
            />
          </Suspense>
        ))}
      </div>
    </>
  );
}
