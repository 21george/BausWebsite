"use client";
import React, { useState, useEffect } from "react";
import ServiceImage from "../../asset/images/IMG_4955.jpg";
import { HeroSection } from "../components/HeroComponent/page";
import { submitcontact } from "../actions/contactaction/SubmitContact";
import { getContact } from "../actions/contactaction/GetContact";

const contactInfo = {
  kontaktSection: [
    {
      title: "Kontakt",
      description:
        "Sie möchten gerne einen Termin vereinbaren oder haben eine Frage an mich? ",
      details:
        "Füllen Sie das Kontaktformular aus, und ich melde mich zum nächstmöglichen Zeitpunkt bei Ihnen.",
      subtext: "Wir freuen uns über Ihre Nachricht",
    },
  ],
  details: [
    {
      heading: "Rufen Sie uns an",
      content: "015-29107771",
      // additionalInfo: "MO – DO (8UHR – 19UHR)\nFR (8UHR – 16UHR)",
    },
    {
      heading: "Schreiben Sie uns eine Mail",
      content: "info@physiokitchen.de",
      // additionalInfo: "24/7/365",
    },
  ],
};

export default function Kontakt() {
  const [formData, setFormData] = useState({ fullname: "", email: "", telefone: "", message: "", datenschutz: false, date: "", });
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

      <section className="flex flex-col items-center justify-center px-6 pt-28 pb-28 text-gray-900">
        <div className="space-y-8 pt-12 pb-36 flex flex-col">
          {contacts.map((contact, index) => (
            <div key={index}>
              <p className="text-3xl mt-2 text-gray-900 flex justify-center">
                {contact.description}
              </p>
              <p className="text-3xl text-gray-900 mt-1">{contact.details}</p>
            </div>
          ))}
        </div>
        <div className="w-full max-w-7xl grid grid-cols-1 gap-6 p-8 shadow-lg border border-gray-200 pb-12 pt-12 rounded-lg md:grid-cols-2 bg-white">
          <div className="space-y-8 pt-12 pb-12">
            {contactInfo.details.map((item, index) => (
              <div key={index}>
                <p className="text-lg font-semibold">{item.heading}</p>
                <p className="text-2xl font-bold text-green-600">
                  {item.content}
                </p>
                <p className="text-sm mt-2 text-gray-600">
                  {item.additionalInfo}
                </p>
                {index < contactInfo.details.length - 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold pb-12 pt-12 mb-4">
              Schreiben Sie uns eine Nachricht.
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {formSubmitted && (
                <p className="text-green-600">
                  Ihre Nachricht wurde erfolgreich gesendet!
                </p>
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
                  Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.
                </label>
              </div>
              {errors.datenschutz && (
                <p className="text-sm text-red-500">{errors.datenschutz}</p>
              )}
              <button
                type="submit"
                className={`w-full text-white py-3 rounded-md font-semibold focus:outline-none focus:ring-2 ${
                  loading ? "bg-gray-400" : "bg-amber-950 hover:bg-amber-700"
                }`}
                disabled={loading}
              >
                {loading ? "Wird gesendet..." : "ANFRAGE ABSENDEN"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}