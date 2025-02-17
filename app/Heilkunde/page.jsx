"use client";
import UnivasHero from "../../asset/images/beginnen-met-yoga_1600x.webp";
import HeroSection from "../components/HeroComponent/page";

export default function Heilkunde() {
  const leftSectionContent = {
    title: "Einen großen Teil meiner Spezialisierung",
    title2: "in der Physiotherapie widme ich Frauen",
  };

  const rightSectionContent = {
    title: "Außerdem begleiten wir bei",
    features: [
      "Schwangerschaftsrückbildung in der Einzeltherapie.",
      "Beckenboden Vorbereitung vor der Geburt",
      "Rectusdiastase",
    ],
  };

  const gridItems = {
    title: "Wir behandeln in der Praxis folgende Beschwerden",
    points: [
      "Schmerzen beim Geschlechtsverkehr",
      "Senkungsgefühl / Druck im Becken",
      "Schmerzen an Vaginalnarben, Dammriss-/ Dammschnittnarben und Kaiserschnittnarben",
    ],
    points1: [
      "Schmerzen rund um die Periode",
      "Urin- oder Stuhlverlust während Belastung",
      "Schwierigkeiten beim selbstbestimmten Harnlassen oder Stuhllassen",
      "Schwierigkeiten Urin in der Blase zu speichern",
    ],
    points2: [
      "Unkontrolliertem Urinverlust",
      "Unkontrolliertem Stuhlverlust",
      "Schmerzen nach Analfissuren",
    ],
  };

  return (
    <main className="pt-20 pb-12">
      <HeroSection
        backgroundImage={UnivasHero.src}
        title="I Help women do this really cool thing in this super interesting way"
        description=""
      />
      <DynamicSections
        left={leftSectionContent}
        right={rightSectionContent}
        gridItems={gridItems}
      />
    </main>
  );
}

function DynamicSections({ left, right, gridItems }) {
  return (
    <>
      {/* Hero Section Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 mt-20 mb-16">
        {/* Left Section */}
        <section className="lg:mt-20 leading-loose lg:ml-28 text-center lg:text-left mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans text-gray-900">
            {left.title}
            <br />
            {left.title2}
          </h2>
        </section>

        {/* Right Section */}
        <section className="mt-8 max-w-xl mx-auto px-2 sm:px-6 flex-row-reverse">
          <h2 className="text-xl sm:text-3xl font-serif text-gray-900">
            {right.title}
          </h2>
          <ul className="mt-6 space-y-4 text-lg text-gray-600">
            {right.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Checkmark Icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="ml-3">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Informational Paragraph */}
      <section className="flex flex-col h-full w-full items-center mt-20 mb-11 text-center">
        <p className="dark:text-gray-600 text-base md:text-base lg:text-lg mb-4 ">
          Im Besonderen behandle ich Frauen mit gynäkologischen, urologischen,
          proktologischen Beschwerden und betreue Sie vor, während und nach der
          Schwangerschaft.
        </p>
        <p className="dark:text-gray-600 text-base md:text-base lg:text-lg mb-4">
          Bei den vorgenannten Themen strebe ich offene Kommunikation an, da mir
          mein Beitrag in die Richtung der Gesellschaftlichen Enttabuisierung
          enorm wichtig ist.
        </p>
        <p className="dark:text-gray-600 text-base md:text-base lg:text-lg mb-4">
          Dennoch erkenne ich zugleich sensible und intime Inhalte und gehe mit
          diesen behutsam um.
        </p>
      </section>

      {/* Grid Section */}
      <section className="flex flex-col items-center mt-20 mb-11 text-center">
        <h2 className="text-2xl text-gray-800 mt-14 mb-14">
          {gridItems.title}
        </h2>
        <div className="grid grid-cols-3 divide-x justify-center w-full sm:grid-cols-2 lg:grid-cols-3 gap-3 divide-y-0 divide-slate-300">
          {[gridItems.points, gridItems.points1, gridItems.points2].map(
            (group, index) => (
              <div key={index} className="px-4 py-6 text-center">
                <ul className="space-y-1 text-gray-600">
                  {group.map((point, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="dark:text-gray-600 text-base md:text-base lg:text-lg">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
