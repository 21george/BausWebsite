"use client";
import Image from "next/image";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import BausLogo from "../../asset/images/Baus.png";
import Link from "next/link";

const FOOTER_LINKS = {
  Adresse: ["Forstenrieder Allee 140F, 81476 München"],
  Telefon: ["089 510 894 77", "0151 29 10 77 71"],
  EMail: ["info@baus-physiotherapie.de"],
};

const SOCIAL_DESCRIPTION =
  "Praxis für gesetzlich, privat versicherte Patienten und Selbstzahler. Meine Praxis ist eine Bestellpraxis, Termine können Sie gerne telefonisch und per Mail vereinbaren. Ich freue mich auf Sie.";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 divide-y bg-neutral-200 text-gray-800">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
          <Link
            href="/"
            passHref
            aria-label="Homepage"
            className="flex items-center space-x-3"
          >
            <Image
              src={BausLogo}
              alt="Baus Physiotherapie Logo"
              width={80}
              height={80}
              className="rounded-full"
              priority={false}
            />
            <span className="text-2xl font-semibold">Nikolina Baus</span>
          </Link>
          <p className="mt-4 text-gray-600 text-center lg:text-left">
            {SOCIAL_DESCRIPTION}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-x-6 gap-y-8 lg:w-2/3 lg:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <section key={section}>
              <h2 className="text-lg font-semibold">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h2>
              <ul className="space-y-3 mt-3">
                {links.map((link, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start space-x-2 text-base">
                    {section === "Adresse" && (
                      <>
                        <FaMapMarkerAlt className="mt-1 flex-shrink-0" aria-hidden="true" />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            link
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {link}
                        </a>
                      </>
                    )}
                    {section === "Telefon" && (
                      <>
                        <FaPhone className="mt-1 flex-shrink-0" aria-hidden="true" />
                        <a href={`tel:${link.replace(/\s/g, "")}`} className="hover:underline">
                          {link}
                        </a>
                      </>
                    )}
                    {section === "EMail" && (
                      <>
                        <FaEnvelope className="mt-1 flex-shrink-0" aria-hidden="true" />
                        <a href={`mailto:${link}`} className="hover:underline">
                          {link}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <div className="py-6 text-center text-sm text-gray-600">
        <p>© {currentYear} Nikolina Baus. All rights reserved.</p>
        <Link 
          href="/impressum" 
          className="text-blue-800 text-lg hover:underline focus:underline"
          aria-label="Impressum"
        >
          Impressum
        </Link>
      </div>
    </footer>
  );
}