import React from "react";
import Image from "next/image"
import BausLogo from "../../../asset/images/Baus.png";

export default function Impresionpage() {
  return (
    <main className="w-full min-h-screen">
      <div className="flex justify-center mb-15">
          <div className="w-64 md:w-80 mt-14 p-12 sm:p-12"> {/* Increased size */}
            <Image
              src={BausLogo}
              alt="Masquerade Logo"
              className="w-full h-auto" /* Makes logo responsive */
              priority
              quality={100} /* Higher quality */
            />
          </div>
        </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16 py-6 sm:py-12 bg-white">
        <div className="prose max-w-none text-left text-gray-700 mb-1">
          <section className="space-y-3" aria-labelledby="legal-details">
            <h2
              id="legal-details"
              className="text-lg sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Angaben gemäß § 5 TMG
            </h2>
            <address className="text-sm sm:text-base md:text-lg not-italic text-gray-600">
              Nikolina Baus
              <br />
              Forstenrieder Allee 140F
              <br />
              81476 München
            </address>
          </section>

          <section className="space-y-3" aria-labelledby="contact-info">
            <h2
              id="contact-info"
              className="text-lg sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Kontakt
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              <a
                href="mailto:info@baus-physiotherapie.de"
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                info@baus-physiotherapie.de
              </a>
            </p>
          </section>

          <section className="space-y-3" aria-labelledby="content-liability">
            <h2
              id="content-liability"
              className="text-lg sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Haftung für Inhalte
            </h2>
            <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die
                auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon
                unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
                diese Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          <section className="space-y-3" aria-labelledby="link-liability">
            <h2
              id="link-liability"
              className="text-lg sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Haftung für Links
            </h2>
            <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
                zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                derartige Links umgehend entfernen.
              </p>
            </div>
          </section>

          <section className="space-y-3" aria-labelledby="copyright">
            <h2
              id="copyright"
              className="text-lg sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Urheberrecht
            </h2>
            <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht
                kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
                Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet.
              </p>
              <p>
                Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                umgehend entfernen.
              </p>
            </div>
          </section>

          <section className="space-y-3" aria-labelledby="eu-dispute">
            <h2
              id="eu-dispute"
              className=" sm:text-x md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              EU-Streitschlichtung
            </h2>
            <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-600">
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </section>

          <section className="space-y-3" aria-labelledby="consumer-dispute">
            <p
              id="consumer-dispute"
              className="sm:text-s md:text-2xl lg:text-3xl font-semibold text-gray-800"
            >
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </p>
            <div className="text-sm sm:text-base md:text-lg text-gray-600">
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-center text-gray-500">
            <strong>Quelle:</strong>{" "}
            <a
              href="https://www.e-recht24.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              e-recht24.de
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}