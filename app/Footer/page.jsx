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
    <footer className="px-4 sm:px-6 md:px-8 bg-neutral-200 text-gray-800">
      <div className="container flex flex-col justify-between py-8 sm:py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        {/* Logo and Description */}
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
              width={60}
              height={60}
              className="rounded-full"
              priority={false}
              sizes="(max-width: 640px) 60px, 80px"
            />
            <span className="text-xl sm:text-2xl font-semibold">Nikolina Baus</span>
          </Link>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base text-center lg:text-left">
            {SOCIAL_DESCRIPTION}
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 text-sm gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 lg:w-2/3 lg:grid-cols-3">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <section key={section} className="px-2 sm:px-0">
              <h2 className="text-base sm:text-lg font-semibold">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h2>
              <ul className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                {links.map((link, idx) => (
                  <li key={idx} className="text-gray-600 flex items-start space-x-2 text-sm sm:text-base">
                    {section === "Adresse" && (
                      <>
                        <FaMapMarkerAlt className="mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true" />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            link
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline break-words"
                        >
                          {link}
                        </a>
                      </>
                    )}
                    {section === "Telefon" && (
                      <>
                        <FaPhone className="mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true" />
                        <a href={`tel:${link.replace(/\s/g, "")}`} className="hover:underline whitespace-nowrap">
                          {link}
                        </a>
                      </>
                    )}
                    {section === "EMail" && (
                      <>
                        <FaEnvelope className="mt-0.5 sm:mt-1 flex-shrink-0" aria-hidden="true" />
                        <a href={`mailto:${link}`} className="hover:underline break-all">
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
      <hr className="h-px my-8 bg-neutral-200 border-0 dark:bg-neutral-300"></hr>
      {/* Copyright and Legal */}
      <div className="py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-600">
        <p>©{currentYear} Nikolina Baus. All rights reserved.</p>
        <Link 
          href="/impressum" 
          className="text-blue-800 text-sm sm:text-base hover:underline focus:underline mt-1 inline-block"
          aria-label="Impressum"
        >
          Impressum
        </Link>
      </div>
    </footer>
  );
}