import React from "react";
import UniversalFoto from "../../../asset/images/R.jpg";
import { HeroSection } from "../HeroComponent/HeroSection";

export default function Impresionpage() {
  return (
    <>
      <HeroSection 
        backgroundImage={UniversalFoto.src} 
        aria-label="Impressum header image"
        title={"Impressum"}
      />
      
      <article className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 lg:px-8 py-16 rounded-lg bg-white">
        <section className="mb-12" aria-labelledby="legal-details">
          <h2 id="legal-details" className="text-2xl font-semibold mb-6">Angaben gemäß § 5 TMG</h2>
          <address className="text-lg not-italic">
            Nikolina Baus
            <br />
            Forstenrieder Allee 140F
            <br />
            81476 München
          </address>
        </section>

        <section className="mb-12" aria-labelledby="contact-info">
          <h2 id="contact-info" className="text-2xl font-semibold mb-6">Kontakt</h2>
          <p className="text-lg">
            <a
              href="mailto:info@baus-physiotherapie.de"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              info@baus-physiotherapie.de
            </a>
          </p>
        </section>

        <section className="mb-12" aria-labelledby="content-liability">
          <h2 id="content-liability" className="text-2xl font-semibold mb-6">Haftung für Inhalte</h2>
          <div className="space-y-4 text-lg">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
              überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
              Inhalte umgehend entfernen.
            </p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="link-liability">
          <h2 id="link-liability" className="text-2xl font-semibold mb-6">Haftung für Links</h2>
          <div className="space-y-4 text-lg">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
              erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="copyright-info">
          <h2 id="copyright-info" className="text-2xl font-semibold mb-6">Urheberrecht</h2>
          <div className="space-y-4 text-lg">
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
              wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="dispute-resolution">
          <h2 id="dispute-resolution" className="text-2xl font-semibold mb-6">EU-Streitschlichtung</h2>
          <div className="space-y-4 text-lg">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p>
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="consumer-dispute">
          <h2 id="consumer-dispute" className="text-2xl font-semibold mb-6">
            Verbraucherstreitbeilegung/Universalschlichtungsstelle
          </h2>
          <p className="text-lg">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <footer className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-lg">
            <strong>Quelle:</strong>{" "}
            <a
              href="https://www.e-recht24.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              https://www.e-recht24.de
            </a>
          </p>
        </footer>
      </article>
    </>
  );
}