"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import BausLogo from "../../asset/images/Baus.png";

export default function Navigationber() {
  const [nav, setNav] = useState(false);
  const links = [
    { id: 1, link: "/", name: "Startseite" },
    { id: 2, link: "Physiotherapie", name: "Physiotherapie" },
    { id: 3, link: "Kontakt", name: "Kontaks" },
    { id: 4, link: "Heilkunde", name: "Heilkunde für Frauen" },
  ];

  return (
    <main className="flex justify-between items-center w-full h-20 px-4 text-white bg-yellow-950 flex-wrap">
      {/* Logo Section */}
      <div>
        <h1 className="text-5xl font-signature ml-2">
          <Link href="/" rel="noreferrer">
            <Image src={BausLogo} alt="baus-logo" className="h-20 w-auto" />
          </Link>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-200 hover:scale-105 hover:text-white duration-200"
          >
            <Link href={`/${link}`}>{name}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          <div>
            <h1 className="text-5xl font-signature ml-2">
              <Link href="/" rel="noreferrer">
                <Image src={BausLogo} alt="baus-logo" className="h-20 w-auto" />
              </Link>
            </h1>
          </div>
          {links.map(({ id, link, name }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
              onClick={() => setNav(false)}
            >
              <Link href={`/${link}`}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
