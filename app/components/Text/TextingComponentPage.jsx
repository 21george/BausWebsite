"use client";
import Image from "next/image";

export default function TextingComponentPage() {
  return (
    <div
      className="relative w-full bg-white py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="w-full lg:w-3/5">
            <div className="space-y-6">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Gemeinschaftspraxis für Osteopathie
              </h4>

              <div className="space-y-4 text-gray-600">
                <p className="text-base lg:text-lg leading-relaxed">
                  Willkommen in unserer Gemeinschaftspraxis für Osteopathie. Wir bieten 
                  Ihnen professionelle osteopathische Behandlungen in entspannter Atmosphäre.
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  Unser erfahrenes Team steht Ihnen mit modernsten Behandlungsmethoden 
                  zur Verfügung, um Ihre Gesundheit und Ihr Wohlbefinden zu fördern.
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  Wir stehen Ihnen zur Verfügung und kümmern uns gern um Sie und Ihre 
                  Gesundheit. Buchen Sie einfach <strong>online</strong> Ihren Termin über 
                  unsere Website. Bei Fragen können Sie uns gern kontaktieren.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-block px-6 py-3 border-2 border-gray-500 text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  ZUR ONLINE-TERMINVEREINBARUNG
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-2/5">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white p-2 max-w-sm mx-auto">
                <Image
                  src="/Images/IMG_6280.jpg"
                  alt="Osteopathie für Schwangere in Herrsching"
                  title="Gemeinschaftspraxis für Osteopathie"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}