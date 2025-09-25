"use client";
import React, { useState, useEffect } from "react";
import ServiceImage from "../../asset/images/IMG_4955.jpg";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import { submitcontact } from "../actions/contactaction/SubmitContact";
import { getContact } from "../actions/contactaction/GetContact";
import { motion } from "framer-motion";

const contactInfo = {
  kontaktSection: [
    {
      title: "Kontakt",
      description:
        "Sie möchten gerne einen Termin vereinbaren oder haben eine Frage an mich?",
      
      subtext: "Wir freuen uns über Ihre Nachricht",
    },
  ],
  details: [
    {
      heading: "Rufen Sie uns an",
      content: "0151 29 10 77 71",
      additionalInfo: "",
    },
    {
      heading: "Schreiben Sie uns eine Mail",
      content: "info@baus-physiotherapie.de",
    },
  ],
  kontaktSection1: [
    {
      description1:"Füllen Sie das Kontaktformular aus, und ich melde mich zum nächstmöglichen Zeitpunkt bei Ihnen",
    }
  ]
};

export default function Kontakt() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    telefone: "",
    message: "",
    datenschutz: false,
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim())
      newErrors.fullname = "Bitte geben Sie Ihren Namen ein.";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Bitte geben Sie eine gültige Email-Adresse ein.";
    }
    if (!formData.telefone.trim())
      newErrors.telefone = "Bitte geben Sie Ihre Telefonnummer ein.";
    if (!formData.date.trim())
      newErrors.date = "Bitte geben sie ihre dateOf Birth";
    if (!formData.message.trim())
      newErrors.message = "Bitte geben Sie eine Nachricht ein.";
    if (!formData.datenschutz)
      newErrors.datenschutz = "Bitte akzeptieren Sie die Datenschutzerklärung.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const result = await submitcontact(formData);
        if (result.success) {
          const emailResponse = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const emailResult = await emailResponse.json();
          if (emailResult.success) {
            setFormSubmitted(true);
            setFormData({
              fullname: "",
              email: "",
              telefone: "",
              message: "",
              datenschutz: false,
              date: "",
            });
          } else {
            console.error(emailResult.error);
          }
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await getContact();
      if (result.success) {
        setContacts(result.data);
      } else {
        setError(result.error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <HeroSection
        backgroundImage={ServiceImage.src}
        title={contacts.length > 0 ? contacts[0].contact_tittle : "Kontakt"}
        titleStyles="text-lg font-bold"
        containerStyles="mb-8"
        description={contacts.length > 0 ? contacts[0].discription : ""}
      />

<section className="bg-white" id="contact">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <div className="mb-4">
      <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
        <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
          Kontaktieren Sie uns
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
          Wir freuen uns auf Ihre Nachricht oder Ihren Anruf!
        </p>
      </div>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-stretch justify-center">
        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Contact Information Column */}
          <div className="h-full pr-6 flex flex-col justify-between">
            <div>
              <p className="mt-3 mb-12 text-m text-gray-600">
                Sie möchten gerne einen Termin vereinbaren oder haben eine Frage? Rufen Sie uns an, schreiben Sie uns eine E-Mail oder nutzen Sie das Kontaktformular.
              </p>
              
              {/* Contacts List */}
              <div className="mb-6 md:mb-0" role="region" aria-label="Contact Information">
                {contacts.length > 0 ? (
                  <ul>
                    {contacts.map((contact, index) => (
                      <li key={`contact-${contact.details}-${index}`} className="flex mb-8" itemScope itemType="https://schema.org/ContactPoint">
                        <div className="ml-4">
                          <p className="prose text-left text-gray-700" itemProp="telephone">
                            {contact.details}
                          </p>
                        </div>
                      </li>
                    ))} 
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-8" aria-live="polite">
                    No contact information available
                  </p>
                )}
              </div>
            
              {/* Additional Contact Info */}
              <ul className="mb-6 md:mb-0">
                {contactInfo.details.map((item, index) => (
                  <li key={index} className="flex mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#6a3435] text-gray-50">
                      {item.heading.includes("Mail") ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      ) : item.heading.includes("Rufen") ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 7v5l3 3"></path>
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">{item.heading}</h3>
                      {item.heading.includes("Mail") ? (
                        <a
                          href={`mailto:${item.content}`}
                          className="text-lg font-bold text-yellow-900 hover:underline"
                        >
                          {item.content}
                        </a>
                      ) : item.heading.includes("Rufen") ? (
                        <a
                          href={`tel:${item.content}`}
                          className="text-lg font-bold text-yellow-900 hover:underline"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="prose text-left text-gray-700 mb-1">
                          {item.content}
                        </p>
                      )}
                      {item.additionalInfo && (
                        <p className="prose text-left text-gray-700 mb-1">
                          {item.additionalInfo}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Google Maps iframe for Forstenrieder Allee */}
            <div className="w-full mt-8">
              <h3 className="text-lg font-semibold mb-4">Unsere Location</h3>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.175399359316!2d11.492711315803884!3d48.08966897921968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e1cc7d075a5a5%3A0x413893b1bddeddc8!2sForstenrieder%20Allee%20140f%2C%2081476%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1718723456789!5m2!1sde!2sde"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white ">
            <h2 className="mb-4 text-2xl font-bold">
              Schreiben Sie uns eine Nachricht
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {formSubmitted && (
                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                  <p className="font-bold">
                    Vielen Dank für Ihre Kontaktaufnahme!
                  </p>
                  <p>
                    Wir haben Ihre Nachricht erhalten und werden uns bald bei
                    Ihnen melden.
                  </p>
                </div>
              )}
              <div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Ihr Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-950 focus:outline-none"
                />
                {errors.fullname && (
                  <p className="text-sm text-red-500">{errors.fullname}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-950 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefon"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-950 focus:outline-none"
                />
                {errors.telefone && (
                  <p className="text-sm text-red-500">{errors.telefone}</p>
                )}
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  placeholder="Birth"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-950 focus:outline-none"
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Ihre Nachricht"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-950 focus:outline-none"
                ></textarea>
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="datenschutz"
                  checked={formData.datenschutz}
                  onChange={handleChange}
                  id="datenschutz"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-yellow-950"
                />
                <label htmlFor="datenschutz" className="text-sm">
                  Ich habe die Datenschutzerklärung gelesen und akzeptiere
                  sie.
                </label>
              </div>
              {errors.datenschutz && (
                <p className="text-sm text-red-500">{errors.datenschutz}</p>
              )}
              <button
                type="submit"
                className={`w-full text-white py-3 font-semibold focus:outline-none focus:ring-2 ${
                  loading ? "bg-gray-400" : "bg-amber-950 hover:bg-amber-700"
                }`}
                disabled={loading}
              >
                {loading ? "Wird gesendet..." : "ANFRAGE ABSENDEN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
    </>
  );
}
