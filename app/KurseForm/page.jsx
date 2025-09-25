"use client";
import React, { useState, useEffect } from "react";
import { submitcontact } from "../actions/contactaction/SubmitContact";
import { getContact } from "../actions/contactaction/GetContact";

export default function KurseForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kurs: "",
    nachricht: "",
  });

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const data = await getContact();
      setContacts(data || []);
    }
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitcontact(formData);
    alert("Ihre Anmeldung wurde erfolgreich gesendet!");
    setFormData({ name: "", email: "", kurs: "", nachricht: "" });
  };

  return (
    <section className="pt-16 pb-12 px-4 bg-gray-100">
  <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm">
    {/* Title */}
    <div className="mb-8 mt-2">
      <p className="text-base text-center">
        Von Rückenschule über Entspannungstechniken bis hin zu speziellen Übungsprogrammen - wir bieten Ihnen ein breites Spektrum an präventiven und therapeutischen Kursen.
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-8 mt-2">
      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Vorname</label>
          <input
            type="text"
            name="vorname"
            value={formData.vorname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Nachname</label>
          <input
            type="text"
            name="nachname"
            value={formData.nachname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">E-Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
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
          <label className="block mb-2 font-medium">Kurs</label>
          <select
            name="kurs"
            value={formData.kurs}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          >
            <option value="">Bitte wählen</option>
            <option value="Yoga">Yoga & Entspannung</option>
            <option value="Fitness">Fitness & Ausdauer</option>
            <option value="Ernährung">Ernährungs-Workshop</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Gewünschtes Startdatum</label>
          <input
            type="date"
            name="startdatum"
            value={formData.startdatum}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-2 focus:ring-yellow-950 focus:outline-none"
          />
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
          className="w-full px-6 py-3 bg-yellow-950 text-white font-medium shadow hover:bg-yellow-800 transition-all duration-300"
        >
          Anmeldung absenden
        </button>
      </div>
    </form>
  </div>
</section>


  );
}
