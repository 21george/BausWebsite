"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection({
  backgroundImage,
  backgroundImageMobile, // Optional mobile-optimized image
  title,
  subtitle,
  overlayColor = "bg-black/30", // Reduced opacity for better visibility
  imageAlt = "Hero background image",
}) {
  return (
    <section className="relative w-full z-0 h-[600px] flex items-center justify-center overflow-hidden">
      {/* Optimized Picture Element */}
      <div className="absolute inset-0 w-full h-full z-0">
        <picture>
          {/* Mobile-optimized image (optional) */}
          {backgroundImageMobile && (
            <source
              media="(max-width: 768px)"
              srcSet={backgroundImageMobile}
            />
          )}
          {/* Fallback image */}
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt={imageAlt}
            fill
            priority
            quality={100}
            blurDataURL={backgroundImage || "/placeholder.svg"}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              width: "100%",
              height: "100%",
              // Subtle sharpening and contrast enhancement
              filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
            }}
          />
        </picture>
      </div>

      {/* Subtle gradient overlay for better text contrast */}
      <div className={`absolute inset-0 ${overlayColor} z-0`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />

      {/* Content with enhanced visibility */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-[800px] mx-auto text-lg md:text-xl text-white/95 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}