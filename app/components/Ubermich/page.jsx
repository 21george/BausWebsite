"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAboutme } from "../../actions/aboutme/Getaboutme";
import { useEffect, useState } from "react";
import DrawerButton from "../drowcomp/page";

const defaultAboutData = {
  images: [
    {
      url: "/Images/IMG_3385.png",
      alt: "Image 1",
    },
    {
      url: "/Images/IMG_3361.png",
      alt: "Image 2",
    },
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
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 justify-center">
      <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Images Grid - Moved to first on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 order-1"
        >
          {localImages.slice(0, 2).map((image, index) => (
            <div
              key={index}
              className={`w-full aspect-[3/4] overflow-hidden relative ${
                index === 1 ? "mt-6 sm:mt-8 lg:mt-12" : ""
              }`}
            >
              <Image
                src={image.url}
                fill
                alt={image.alt}
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
                priority={index === 0}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
              />
            </div>
          ))}
        </motion.div>

        {/* Content - Closer to images */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-tight">
                {data[0].P_tittle}
              </h2>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
              {data[0].short_text}
            </p>
            <div className="flex justify-center lg:justify-start">
              <DrawerButton className="group text-xs sm:text-sm tracking-[0.2em] hover:text-gray-800 transition-colors flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                VIEW MORE
                <span className="h-[1px] w-6 sm:w-8 bg-current transform transition-transform group-hover:translate-x-2 duration-300"></span>
              </DrawerButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}