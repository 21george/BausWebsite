"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateIn } from "./animate-in";
import { getAboutme } from "../../actions/aboutme/Getaboutme";
import { useEffect, useState } from "react";
import DrawerButton from "../drowcomp/page";

// Default data as fallback
const defaultAboutData = {
 
  images: [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      alt: "Team collaborating in modern therapy space",
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
      alt: "Modern physiotherapy equipment",
    },
    {
      url: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
      alt: "Physiotherapy session in progress",
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
        return <div>Loading...</div>;
    } 

  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Content */}
          <div className="flex flex-col gap-4">
            <AnimateIn animation="slide-up">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {data[0].P_tittle}
              </h2>
            </AnimateIn>
            <AnimateIn animation="slide-up" delay={0.1}>
              <p className="text-muted-foreground md:text-lg">
                {data[0].short_text}
              </p>
          <DrawerButton className="self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50"/>
            </AnimateIn>
          </div>
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              {defaultAboutData.images.slice(0, 2).map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    width={300}
                    height={index === 0 ? 400 : 300}
                    alt={image.alt}
                    className={`h-[${index === 0 ? "200px" : "250px"}] sm:h-[${
                      index === 0 ? "300px" : "250px"
                    }] w-full object-cover transition-transform hover:scale-105`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={defaultAboutData.images[2].url || "/placeholder.svg"}
                  width={300}
                  height={500}
                  alt={defaultAboutData.images[2].alt}
                  className="h-[400px] sm:h-[400px] w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
