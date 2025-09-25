"use client";
import Image from "next/image";
import Link from "next/link";

export default function Kurse() {
  return (
    <>
      {/* Hero Section */}
       <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Images/IMG_6280.jpg"
            alt="Kurse und Workshops Hero"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Kurse & Workshops
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stärken Sie Ihre Gesundheit durch professionell geleitete Kurse und
              individuelle Betreuung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#kurse-info"
                className="px-8 py-4 bg-yellow-950 text-white hover:bg-yellow-800 transition-all duration-300 font-medium text-lg rounded-lg shadow-lg hover:shadow-xl"
              >
                Mehr erfahren
              </a>

              <Link
                href="/KurseForm"
                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-yellow-950 transition-all duration-300 font-medium text-lg  transform hover:scale-105"
              >
                Jetzt anmelden
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div id="kurse-info" className="relative w-full bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-3/5">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Unser Kursangebot
                </h2>

                <div className="space-y-4 text-gray-600">
                  <p className="text-base lg:text-lg leading-relaxed">
                    Entdecken Sie unser vielfältiges Kursangebot für Gesundheit und
                    Wohlbefinden. Unsere professionell geleiteten Kurse unterstützen
                    Sie dabei, aktiv etwas für Ihre Gesundheit zu tun.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed">
                    Von Rückenschule über Entspannungstechniken bis hin zu speziellen
                    Übungsprogrammen - wir bieten Ihnen ein breites Spektrum an
                    präventiven und therapeutischen Kursen.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed">
                    Alle Kurse werden von qualifizierten Therapeuten geleitet.
                    Melden Sie sich{" "}
                    <strong>online</strong> für Ihre gewünschten Kurse an oder
                    kontaktieren Sie uns bei Fragen.
                  </p>
                </div>

                {/* Course List */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Unsere Kursangebote:
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-yellow-950 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Rückenschule & Wirbelsäulengymnastik</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Stärkung der Rückenmuskulatur und Verbesserung der Haltung
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-yellow-950 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Entspannungskurse & Stressmanagement</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Techniken zur Stressbewältigung und Entspannung
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-yellow-950 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Schwangerschaftsgymnastik</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Sanfte Übungen für werdende Mütter
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-yellow-950 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Rehabilitation nach Verletzungen</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Gezielte Übungen zur Wiederherstellung der Beweglichkeit
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-3 h-3 bg-yellow-950 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong>Präventive Bewegungskurse</strong>
                        <p className="text-sm text-gray-500 mt-1">
                          Vorbeugung von Beschwerden durch regelmäßige Bewegung
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/KurseForm"
                    className="inline-block px-6 py-3 border border-amber-950 text-yellow-950 hover:bg-armber-950 hover:text-white hover:border-yellow-950 transition-all duration-300 font-medium text-sm sm:text-base rounded-md transform hover:scale-105"
                  >
                    KURSANMELDUNG & INFORMATION
                  </Link>
                </div>
               {/* <div className="mt-8">
                  <Link
                    href="/OnlineKurse"
                    className="inline-block px-6 py-3 border-2 border-yellow-950 text-yellow-950 hover:bg-yellow-950 hover:text-white hover:border-yellow-950 transition-all duration-300 font-medium text-sm sm:text-base rounded-md transform hover:scale-105"
                  >
                    ONLINEKURSE & INFORMATION
                  </Link>
                </div> */}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg bg-white p-2 max-w-sm mx-auto">
                  <Image
                    src="/Images/IMG_6280.jpg"
                    alt="Kurse und Workshops für Gesundheit und Wohlbefinden"
                    title="Kurse & Workshops - Baus Praxis"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}