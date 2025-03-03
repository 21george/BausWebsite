"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateIn } from "./animate-in";

// Default data as fallback
const defaultAboutData = {
  title: "Urber Mich",
  description:
    "Ein herzliches Hallo und willkommen auf meiner Webseite.\nIch, Nikolina Baus bin staatlich geprüfte Physiotherapeutin und neben meinen weiteren Zusatzqualifikationen in der Physiotherapie interessiere ich mich auch für die Medizin.\n\nDas lernen rund um den menschlichen Körper bereitet mir unheimlich viel Freude, genauso wie Menschen eine Stütze zu sein damit sie ihre Ziele erreichen.\nMit jeder Herausforderung, die meine Patienten mitbringen wächst stetig mein Wissen und lässt mich mit meinem Patienten wachsen - denn jeder Körper ist einzigartig.\nMein Interesse an den unterschiedlichsten Bereichen in der Physiotherapie hat mich von einer psychosomatischen Klinik zu der BG Unfallklinik Murnau sowie zu einer Gynäkologischen Praxis in Karlsfeld und außerdem noch zum bayrischen Gewichtheber Verband geführt.\nMittlerweile habe ich meine zwei Hauptspezialisierungen gefunden - die physiotherapeutische Gynäkologie im Zusammenhang mit der Urologie und Proktologie und zur Trainingstherapie.\nUm für mich einen Ausgleich zu finden beschloss ich vor 2 Jahren eine Ausbildung zur physiotherapeutischen Yogalehrerin zu absolvieren - diese habe ich zwischenzeitlich erfolgreich abgeschlossen und versuche seither diese Ausgeglichenheit in meinem Kurs an jeden einzelnen Teilnehmer weiterzugeben.\n\n\nIch freue mich auf Ihren Besuch.\n\n\nHerzlichst,\n\nIhre Nikolina Baus",
  mission: {
    title: "Our Mission",
    description:
      "To empower individuals with personalized therapeutic solutions that enhance their quality of life and physical well-being.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To create a world where everyone has access to expert physiotherapy care and the knowledge to maintain optimal physical health.",
  },
  stats: [
    {
      value: "2000+",
      label: "Patients Treated",
    },
    {
      value: "15+",
      label: "Expert Therapists",
    },
    {
      value: "25+",
      label: "Treatment Types",
    },
  ],
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

// async function getAboutData() {
//   try {
//     // Ensure we're using the correct base URL
//     const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
//     const res = await fetch(`${baseUrl}/api/about`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 3600 },
//     })

//     if (!res.ok) {
//       console.error("Failed to fetch about data:", await res.text())
//       return defaultAboutData
//     }

//     const data = await res.json()
//     return data
//   } catch (error) {
//     console.error("Error fetching about data:", error)
//     return defaultAboutData
//   }
// }

export default async function ÜberMich() {
  // const data = await getAboutData();

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
                {defaultAboutData.title}
              </h2>
            </AnimateIn>
            <AnimateIn animation="slide-up" delay={0.1}>
              <p className="text-muted-foreground md:text-lg">
                {defaultAboutData.description}
              </p>
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
