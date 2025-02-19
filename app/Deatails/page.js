import React from "react";
import DeatailsList from "./Deatailslist/page";

export default function DynamicSection() {
  return (
    <section className="p-4 lg:p-8 dark:bg-gray-100 dark:text-gray-800">
      <div className="container mx-auto space-y-12">
        <DeatailsList />
      </div>
    </section>
  );
}
