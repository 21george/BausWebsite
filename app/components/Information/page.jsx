import React from "react";

const InfoSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

const Impressum = ({ sections }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:px-8 py-16 rounded-lg">
    <h1 className="text-3xl font-bold text-center mb-8">Impressum</h1>
    {sections.map((section, index) => (
      <InfoSection key={index} title={section.title}>
        {section.content}
      </InfoSection>
    ))}
   
  </div>
);

export default Impressum;
