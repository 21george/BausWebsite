"use client";
import Image from "next/image";
import React, { useState } from "react";
import BausLogo from "../../asset/images/Baus.png"

export default function KurseForm() {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    adresse: "",
    telefon: "",
    geburtsdatum: "",
    plz: "",
    stadt: "",
    kurs: "",
    nachricht: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vorname.trim()) newErrors.vorname = "Vorname ist erforderlich";
    if (!formData.nachname.trim()) newErrors.nachname = "Nachname ist erforderlich";
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }
    if (!formData.kurs) newErrors.kurs = "Bitte wählen Sie einen Kurs aus";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: "error", text: "Bitte korrigieren Sie die Fehler im Formular." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Send email only
      const emailResponse = await fetch("/api/SendKurseEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email API response not ok:', emailResponse.status, errorText);
        throw new Error(`Email service error: ${emailResponse.status}`);
      }
      const emailResult = await emailResponse.json();
      if (!emailResult.success) {
        console.error('Email send failed:', emailResult.error);
        throw new Error(emailResult.error || 'Fehler beim Senden der E-Mail');
      }
      // Success message
      setMessage({
        type: "success",
        text: "Ihre Anmeldung wurde erfolgreich gesendet! Sie erhalten in Kürze eine Bestätigungsmail.",
      });

      setFormData({
        vorname: "",
        nachname: "",
        email: "",
        adresse: "",
        telefon: "",
        geburtsdatum: "",
        plz: "",
        stadt: "",
        kurs: "",
        nachricht: "",
      });
      Route.back('/app/Kurse');

    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ 
        type: "error", 
        text: "Es gab einen Fehler beim Senden Ihrer Anmeldung. Bitte versuchen Sie es erneut." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 



  return (
    <section className="pt-16 pb-12 px-4 bg-gray-100 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-[7rem] shadow-sm">
        <div className="flex justify-center mb-4 ">
          <Image src={BausLogo}
            alt="baus-logo"
            className="h-20 w-auto pl-6"
          />
        </div>
    {/* Title */}
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Kursanmeldung</h1>
    </div>

    {/* Message Display */}
    {message.text && (
      <div className={`mb-6 p-4 rounded-lg ${
        message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
        message.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
        'bg-red-100 text-red-800 border border-red-300'
      }`}>
        {message.text}
      </div>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-8 mt-2">
      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Vorname*</label>
          <input
            type="text"
            name="vorname"
            value={formData.vorname}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none ${
              errors.vorname ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.vorname && <p className="text-red-500 text-sm mt-1">{errors.vorname}</p>}
        </div>
        <div>
          <label className="block mb-2 font-medium">Nachname*</label>
          <input
            type="text"
            name="nachname"
            value={formData.nachname}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none ${
              errors.nachname ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.nachname && <p className="text-red-500 text-sm mt-1">{errors.nachname}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">E-Mail*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 font-medium">Telefonnummer</label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Geburtsdatum</label>
          <input
            type="date"
            name="geburtsdatum"
            value={formData.geburtsdatum}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Straße & Hausnummer</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">PLZ</label>
          <input
            type="text"
            name="plz"
            value={formData.plz}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Stadt</label>
          <input
            type="text"
            name="stadt"
            value={formData.stadt}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
      </div>

      {/* Kurs Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Kurs*</label>
          <select
            name="kurs"
            value={formData.kurs}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none ${
              errors.kurs ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Bitte wählen</option>
            <option value="Next Me - Dein Kurs nach der Entbindung">Next Me - Dein Kurs nach der Entbindung</option>
            <option value="PhysioFlowYoga">PhysioFlowYoga</option>
          </select>
          {errors.kurs && <p className="text-red-500 text-sm mt-1">{errors.kurs}</p>}
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label className="block mb-2 font-medium">Nachricht / Bemerkungen</label>
        <textarea
          name="nachricht"
          value={formData.nachricht}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
        ></textarea>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 font-medium shadow transition-all duration-300 ${
            isSubmitting 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-yellow-950 text-white hover:bg-yellow-800'
          }`}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Anmeldung absenden'}
        </button>
        <p className="text-sm text-gray-600 mt-2">* Pflichtfelder</p>
      </div>
    </form>
  </div>
</section>


  );
}
