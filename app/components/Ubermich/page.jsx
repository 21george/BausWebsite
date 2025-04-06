"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateIn } from "./animate-in";
import { getAboutme } from "../../actions/aboutme/Getaboutme";
import { useEffect, useState } from "react";
import DrawerButton from "../drowcomp/page";

// Local images from public folder
const defaultAboutData = {
  images: [
    {
      url: "/Images/IMG_3385.png",
      alt: "Image 1",
    },
    {
      url: "/Images/IMG_1485.jpg",
      alt: "Image 2",
    }
  ],
};

export default function ÜberMich() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getAboutme();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const localImages = data[0]?.images || defaultAboutData.images; 

  return (
    <section className="py-12 md:py-20 lg:py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        {/* Content */}
        <div className="space-y-6 md:space-y-8 ml-12 lg:space-y-12 text-center lg:text-left order-2 lg:order-1">
          <AnimateIn animation="slide-up">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
                {data[0].P_tittle}
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={0.1}>
            <p className="text-gray leading-relaxed lg:mr-14 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              {data[0].short_text}
            </p>
            <div className="flex justify-center lg:justify-start">
              <DrawerButton className="group text-xs sm:text-sm tracking-[0.2em] hover:text-white/50 transition-colors flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                VIEW MORE
                <span className="h-[1px] w-8 sm:w-12 bg-current transform transition-transform group-hover:translate-x-2 sm:group-hover:translate-x-4"></span>
              </DrawerButton>
            </div>
          </AnimateIn>
        </div>
        
        {/* Images Grid */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }} 
          className="grid grid-cols-2 gap-4 sm:gap-6 order-1 lg:order-2"
        >
          {localImages.slice(0, 2).map((image, index) => (
            <div 
              key={index} 
              className={`w-full aspect-[3/4] overflow-hidden ${index === 1 ? 'mt-8 sm:mt-12 lg:mt-20' : ''}`}
            >
              <Image 
                src={image.url} 
                width={600} 
                height={800} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                priority={index === 0} 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}