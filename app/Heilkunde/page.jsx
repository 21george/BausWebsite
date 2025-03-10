"use client";
import { useEffect, useState } from "react";
import UnivasHero from "../../asset/images/beginnen-met-yoga_1600x.webp";
import HeilkundeGrid from "../components/HeilkundeComponents/HeilkundeGrid";
import HeilkundeSection from "../components/HeilkundeComponents/HeilkundeSection";
import { HeroSection } from "../components/HeroComponent/page";
import { getHeilkundeInfo } from "../actions/HeilkundeAction/GetHeilkunde";

export default function Heilkunde() {
  return (
    <main>
      <HeroSection
        backgroundImage={UnivasHero.src}
        title="I Help women do this really cool thing in this super interesting way"
        description=""
      />
      <DynamicSections />
    </main>
  );
}

function DynamicSections() {
  const [rightSectionContent, setRightSectionContent] = useState({ title: "", features: [], featursTittle: [] });
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [sectionContent, setSectionContent] = useState("");
  const [featursTittle, setFeatursTittle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getHeilkundeInfo();
        if (result.success) {
          setData(result.data);
          setSectionContent(result.data.SectionContent); // Set section content from database
          setFeatursTittle(result.data.featursTittle); // Set featursTittle from database
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('An unexpected error occurred');
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Hero Section Content */}
      <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 mt-20 mb-16">
        {/* Left Section */}
        <section className="leading-loose text-center mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans text-gray-900">
            {data.featursTittle} {/* Display featursTittle from database */}
          </h2>
        </section>

        {/* Right Section */}
        <section className="mt-8 max-w-xl mx-auto px-2 sm:px-6">
          <h2 className="text-xl sm:text-3xl font-serif text-gray-900">
            {rightSectionContent.title}
          </h2>
          <ul className="mt-6 space-y-4 text-lg text-gray-800">
            {data.map((item, index) => (
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
                <span className="ml-3">{item.features}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Informational Paragraph */}
        <HeilkundeSection />
        {/* Grid Section */}
        <HeilkundeGrid />
      </div>
    </>
  );
}
