"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import HeroImage from "../../public/Images/IMG_7712.jpg";
import { useCourseData } from "../../hooks/useCourseData";

export default function Kurse() {
  const { courseData: dbCourseData, loading, error } = useCourseData({ realtime: true });
  
  // Fallback to local state if needed
  const [courseData, setCourseData] = useState({
    hero: {
      title: "Kurse & Workshops",
      image: "/Images/IMG_7712.jpg",
      imageAlt: "Kurse und Workshops Hero"
    },
    mainCourse: {
      title: "Next Me - Dein Kurs nach der Entbindung",
      description: "Unser erstes Kennenlernen startet mit einem 1:1 Termin bei uns in der Praxis, zur Untersuchung und Aufnahme. Bei Bedarf auch einer Sonografie der Bauchmuskulatur und/oder der Bauchorgane. Danach starten deine 4 Module bei uns in der Praxis:",
      modules: [
        { name: "Modul 1", description: "Beckenboden & Rumpf" },
        { name: "Modul 2", description: "Training" },
        { name: "Modul 3", description: "Training & Hormone" },
        { name: "Modul 4", description: "Beckenbodenentspannung" }
      ],
      content: [
        "Wir starten den Kurs in der Gruppe mit dem Verständnis für den Beckenboden und den Rumpf, danach der Verbindung zu diesen Strukturen.",
        "Die Rückbildung startet ab Tag 1 nach der Entbindung.\nWir müssen besonders in der 2. Wundheilungsphase Reize zur spezifischen Anpassung in die Struktur geben damit wir das Gewebe qualitativ aufbauen.",
        "Weiter geht es mit der Edukation über hormonelle Prozesse und wie dich diese postpartal beeinflussen können. Außerdem besprechen wir deinen Trainingsplan für die nächsten Wochen.",
        "Im letzten Modul geht es rund um Entspannungstechniken.\nWir werden gemeinsam atmen, den Beckenboden dehnen und mobilisieren.\nAn diesem Tag werden zusätzlich noch alle weiteren Fragen geklärt und damit ist der Kurs bei uns auch schon abgeschlossen."
      ]
    },
    courseInfo: {
      sectionTitle: "Alle Infos auf einen Blick:",
      highlights: [
        "5 wöchige Betreuung mit Trainingsplan",
        "Kursteilnahme ab der 2. Woche nach Entbindung",
        "1:1 Termin in der Woche vom {consultationWeek} nach Vereinbarung"
      ],
      startDate: "06.11.2024",
      startDateLabel: "Kursstart am:",
      schedule: [
        { date: "01. November", name: "Modul 1" },
        { date: "08. November", name: "Modul 2" },
        { date: "15. November", name: "Modul 3" },
        { date: "22. November", name: "Modul 4" }
      ],
      consultationWeek: "20.11-25.11"
    },
    yoga: {
      title: "Yoga",
      content: [
        "Hier in der Praxis findest du am Mittwoch PhysioFlowYoga.\nDas physiotherapeutische Yoga Konzept ist Ashtanga geprägt.\nIn jeder ersten Woche des Monats finden Einsteigerkurse statt. In der restlichen Zeit findest du leichte bis mittelschwere Yogastunden.",
        "Ich lade dich herzlich ein, in deinem Körper anzukommen, die Selbsterfahrung zu machen sich Zeit für sich zu nehmen & letztlich zu entschleunigen. Die Kursteilnahme ist ausschließlich durch eine Voranmeldung möglich.",
        "Du kannst bei meinen Yogastunden auf Grund deines Einkommens und deiner Möglichkeiten selbst entscheiden, welchen finanziellen Ausgleich du für meine Arbeit geben kannst und möchtest."
      ],
      pricingTitle: "Preise nach Preisstaffel:",
      pricing: {
        einzelstunde: { label: "Einzelstunde", min: 15, max: 30 },
        zehnerkarte: { label: "10er Karte", min: 170, max: 210 }
      }
    },
    buttons: {
      registration: {
        text: "📅 KURSANMELDUNG",
        href: "/KurseForm"
      }
    },
    images: {
      main: {
        src: "/Images/IMG_7712.jpg",
        alt: "Kurse und Workshops für Gesundheit und Wohlbefinden",
        title: "Kurse & Workshops - Baus Praxis"
      }
    },
    OnlineProdukt: {
      title: "Digitale Online Kurse",
      content: [
        "Coming Soon"
      ],
      pricingTitle: "",

    }
  });

  // Use database data when available, otherwise fall back to local state
  const displayData = dbCourseData || courseData;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-950 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  // Show error state but still render with fallback data
  if (error && !courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error Loading Course Data</h2>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
  {/* Hero Section */}
  <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
    <HeroSection
      backgroundImage={HeroImage.src}
      backgroundImageMobile={HeroImage.src}
      title={displayData.hero.title}
      subtitle={displayData.hero.subtitle}
    />
  </section>

  {/* Main Content Section */}
  <div
    id="kurse-info"
    className="relative flex items-center mt-8 sm:mt-12 justify-center w-full bg-white py-6 sm:py-10 lg:py-16 min-h-screen"
  >
    <div className="container  mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 xl:gap-16">
        {/* Main Content Column */}
        <div className="w-full max-w-4xl">
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left text-left">
            {/* Title */}
            <h2 className="text-xl sm:text-base md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {displayData.mainCourse.title}
            </h2>

            {/* Description & Modules */}
            <div className="space-y-3 lg:space-y-4 text-gray-600">
              <p className="text-left sm:text-left text-sm sm:text-sm md:text-lg leading-relaxed">
                {displayData.mainCourse.description}
              </p>

              {/* Modules List */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-sm sm:text-base">
                  {displayData.mainCourse.modules.map((module, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                      <span>
                        <strong>{module.name}:</strong> {module.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Paragraphs */}
              {displayData.mainCourse.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-left sm:text-left text-sm sm:text-sm md:text-lg leading-relaxed"
                >
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Course Info */}
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl sm:text-smfont-semibold text-gray-800 mb-3 sm:mb-4">
                {displayData.courseInfo.sectionTitle}
              </h3>

              <div className="bg-gray-50 p-3 sm:p-4 mb-4 rounded-lg">
                <ul className="space-y-2 sm:space-y-3 text-gray-700">
                  {displayData.courseInfo.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0"></span>
                      <div className="text-sm sm:text-sm">
                        <strong>
                          {highlight.replace(
                            "{consultationWeek}",
                            displayData.courseInfo.consultationWeek
                          )}
                        </strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="mb-6 mt-10">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {displayData.courseInfo.startDateLabel}{" "}
                  {displayData.courseInfo.startDate}
                </h4>
                <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-2">
                  {displayData.courseInfo.schedule.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-start text-sm sm:text-base p-1"
                    >
                      <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                      <span>
                        <strong>
                          {module.date} - {module.name}
                        </strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Yoga Section */}
            <div className="from-yellow-50 to-amber-50 p-4 sm:p-6 rounded-xl mt-10 sm:mt-12">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                {displayData.yoga.title}
              </h3>

              <div className="space-y-3 lg:space-y-4 text-gray-600">
                {displayData.yoga.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-left sm:text-left text-sm sm:text-sm md:text-lg leading-relaxed"
                  >
                    {paragraph.split("\n").map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < paragraph.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}

                {/* Pricing */}
                <div className="mt-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                    {displayData.yoga.pricingTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                        <div className="text-sm sm:text-base">
                          <strong>
                            {displayData.yoga.pricing.einzelstunde.label}:
                          </strong>{" "}
                          {displayData.yoga.pricing.einzelstunde.min}-
                          {displayData.yoga.pricing.einzelstunde.max} Euro
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                        <div className="text-sm sm:text-base">
                          <strong>
                            {displayData.yoga.pricing.zehnerkarte.label}:
                          </strong>{" "}
                          {displayData.yoga.pricing.zehnerkarte.min}-
                          {displayData.yoga.pricing.zehnerkarte.max} Euro
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center w-full">
              <Link
                href={displayData.buttons.registration.href}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-yellow-950 text-yellow-950 hover:bg-yellow-950 hover:text-white transition-all duration-300 font-medium text-sm rounded-md transform hover:scale-105 text-center"
              >
                {displayData.buttons.registration.text}
              </Link>
              <Link
                href="/OnlineKurse"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition-all duration-300 font-medium text-sm rounded-md transform hover:scale-105 text-center"
              >
                ONLINEKURSE
              </Link>
            </div>
          </div>
        </div>

        {/* Online Produkt Section */}
        <div className="w-full mt-12 text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            {displayData.OnlineProdukt.title}
          </h3>
          <div className="space-y-3 lg:space-y-4 text-gray-600">
            {displayData.OnlineProdukt.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base md:text-lg leading-relaxed"
              >
                {paragraph.split("\n").map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}

            <div className="mt-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                {displayData.OnlineProdukt.pricingTitle}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    
  );
}