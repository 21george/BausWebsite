"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
  // overlayColor = "bg-black/50",
  imageAlt = "Hero background image",
}) {
  return (
    <section
      className={
        "relative min-h-[600px] w-full flex items-center justify-center z-0"
      }
    >
      {/* Background Image */}
      <Image
        src={backgroundImage || "/placeholder.svg" || "/placholder.png"}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center brightness-80"
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Dark Overlay */}

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1
            className={
              "text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl z-10"
            }
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={
                "mt-4 max-w-[800px] mx-auto text-lg md:text-xl text-white z-10"
              }
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
