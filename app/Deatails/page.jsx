import React from "react";
import DetailsList from "./DetailsList";


export default function DynamicSection() {
  return (
    <section className="p-4 w-full lg:p-8 dark:bg-gray-100 dark:text-gray-800">
      <div className="container mx-auto space-y-12">
        <DetailsList />
      </div>
    </section>
  );
}
