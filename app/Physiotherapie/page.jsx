"use client";

import PhysiotherapieImage from "../../asset/images/IMG_2950.png";
import ArticleSection from "../components/ArticleSection/page";
import { HeroSection } from "../components/HeroComponent/page";
import PromoCards from "../components/ProductCards/page";

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
      <PromoCards />
    </>
  );
}
