"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
  overlayColor = "bg-black/40",
  imageAlt = "Hero background image",
}) {
  return (
    <section className="relative w-full z-0 h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          quality={100}
          sizes="100vw"
          style={{
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div className={`absolute inset-0 ${overlayColor} z-0`} />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-[800px] mx-auto text-lg md:text-xl text-white/90 drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}