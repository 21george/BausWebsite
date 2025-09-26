"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import  HeroImage  from "../../public/Images/IMG_7712.jpg";

export default function Kurse() {
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

  return (
    <>
      {/* Hero Section */}
       <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <HeroSection
          backgroundImage={HeroImage.src}
          backgroundImageMobile={HeroImage.src}
          title={courseData.hero.title}
          subtitle={courseData.hero.subtitle}
        />
      </section>

      {/* Main Content Section */}
      <div id="kurse-info" className="relative flex items-center justify-center w-full bg-white py-8 sm:py-12 lg:py-16 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 xl:gap-16">
            {/* Main Content Column */}
            <div className="w-full max-w-4xl">
              <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {courseData.mainCourse.title}
                </h2>

                <div className="space-y-3 lg:space-y-4 text-gray-600">
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                    {courseData.mainCourse.description}
                  </p>
                  
                  <div className="bg-gray-50 p-3 sm:p-4 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      {courseData.mainCourse.modules.map((module, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                          <span><strong>{module.name}:</strong> {module.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {courseData.mainCourse.content.map((paragraph, index) => (
                    <p key={index} className="text-xs sm:text-sm md:text-base leading-relaxed">
                      {paragraph.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < paragraph.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>

                {/* Course List */}
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                    {courseData.courseInfo.sectionTitle}
                  </h3>
                  
                  <div className="bg-gray-50 p-3 sm:p-4 mb-4">
                    <ul className="space-y-2 sm:space-y-2 text-gray-700">
                      {courseData.courseInfo.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0"></span>
                          <div className="text-sm sm:text-sm">
                            <strong>
                              {highlight.replace('{consultationWeek}', courseData.courseInfo.consultationWeek)}
                            </strong>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                      {courseData.courseInfo.startDateLabel} {courseData.courseInfo.startDate}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1">
                      {courseData.courseInfo.schedule.map((module, index) => (
                        <div key={index} className="flex items-start bg-white p-2 sm:p-3">
                          <span className="w-2 h-2  mr-2 mt-1 flex-shrink-0"></span>
                          <div className="text-sm sm:text-sm">
                            <strong>{module.date} - {module.name}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/** YOGA */}
                <div className=" from-yellow-50 to-amber-50 p-3 sm:p-4 lg:p-6 rounded-xl mt-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    {courseData.yoga.title}
                  </h3>
                  
                  <div className="space-y-3 lg:space-y-4 text-gray-600">
                    {courseData.yoga.content.map((paragraph, index) => (
                      <p key={index} className="text-xs sm:text-sm md:text-base leading-relaxed">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}

                    <div className="mt-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                        {courseData.yoga.pricingTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1">
                        <div className="bg-white p-3 ">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                            <div className="text-xs sm:text-sm">1
                              <strong>{courseData.yoga.pricing.einzelstunde.label}:</strong> {courseData.yoga.pricing.einzelstunde.min}-{courseData.yoga.pricing.einzelstunde.max} Euro
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-yellow-950 rounded-full mr-2 flex-shrink-0"></span>
                            <div className="text-xs sm:text-sm">
                              <strong>{courseData.yoga.pricing.zehnerkarte.label}:</strong> {courseData.yoga.pricing.zehnerkarte.min}-{courseData.yoga.pricing.zehnerkarte.max} Euro
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={courseData.buttons.registration.href}
                    className="inline-flex items-center justify-center px-4 py-2 border border-yellow-950 text-yellow-950 hover:bg-yellow-950 hover:text-white transition-all duration-300 font-medium text-xs sm:text-sm rounded-md transform hover:scale-105 text-center"
                  >
                    {courseData.buttons.registration.text}
                  </Link>
                  <Link
                    href="/OnlineKurse"
                    className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white transition-all duration-300 font-medium text-xs sm:text-sm rounded-md transform hover:scale-105 text-center"
                  >
                    ONLINEKURSE
                  </Link>
                
                </div>
              </div>
            </div>
          </div>
          {/** Online Produkt Section */}
          <div className="w-full mt-12 text-center bg-gray-50">
            <div className=" from-yellow-50 to-amber-50 p-3 sm:p-4 lg:p-6 rounded-xl mt-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                    {courseData.OnlineProdukt.title}
                  </h3>
                  <div className="space-y-3 lg:space-y-4 text-gray-600">
                    {courseData.OnlineProdukt.content.map((paragraph, index) => (
                      <p key={index} className="text-xs sm:text-sm md:text-base leading-relaxed">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}

                    <div className="mt-4">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                        {courseData.OnlineProdukt.pricingTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1">
                      </div>
                    </div>
                  </div>
            </div>
            </div>
          </div>
        </div>
    </>
    
  );
}