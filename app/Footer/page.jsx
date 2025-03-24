"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import BausLogo from "../../asset/images/Baus.png";
import Link from "next/link";

export default function Footerpage() {
  const [footerLinks] = useState({
    Adresse: ["Forstenrieder Allee 140F, 81476 München"],
    Telefon: ["089 510 894 77", "0151 29 10 77 71"],
    EMail: ["info@baus-physiotherapie.de"],
  });

  const [socialLinks] = useState([
    {
      id: 1,
      description:
        "Praxis für gesetzlich, privat versicherte Patienten und Selbstzahler. Meine Praxis ist eine Bestellpraxis, Termine können Sie gerne telefonisch und per Mail vereinbaren. Ich freue mich auf Sie.",
    },
  ]);

  return (
    <footer className="px-4 divide-y bg-neutral-200 text-gray-800">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center space-x-3"
          >
            <Image
              src={BausLogo}
              alt="Bauslogo"
              width={80}
              height={80}
              className="rounded-full"
            />
            <span className="text-2xl font-semibold">Nikolina Baus</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-x-6 gap-y-8 lg:w-2/3 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h3 className="text-lg font-semibold">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h3>
              <ul className="fa-ul">
                {links.map((link, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center space-x-2 text-base mb-3">
                    {section === "Adresse" && <FaMapMarkerAlt />}
                    {section === "Telefon" && <FaPhone />}
                    {section === "EMail" && <FaEnvelope />}
                    <span>{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6 text-center text-sm text-gray-600">
        <p>© 2023 Nikolina Baus. All rights reserved.</p>
        <Link href="/impressum" className="text-blue-800 text-lg">
          Impressum
        </Link>
      </div>
    </footer>
  );
}
