"use server";
import { createClient } from "../../../utils/superbase/server";

export async function submitKurse(formData) {
  const supabase = await createClient();

  const vorname = formData.vorname;
  const nachname = formData.nachname;
  const email = formData.email;
  const adresse = formData.adresse;
  const telefon = formData.telefon;
  const geburtsdatum = formData.geburtsdatum;
  const plz = formData.plz;
  const stadt = formData.stadt;
  const kurs = formData.kurs;
  const nachricht = formData.nachricht;
  const created_at = new Date().toISOString();

  // Insert into kurse_registrations table
  const { data, error } = await supabase.from("kurse_registrations").insert([
    { 
      vorname, 
      nachname, 
      email, 
      adresse, 
      telefon, 
      geburtsdatum, 
      plz, 
      stadt, 
      kurs, 
      nachricht,
      created_at 
    },
  ]);
  
  console.log(data, "submitKurse");
  if (error) {
    console.error(error, "error in submitting course registration");
    return { success: false, error: error.message };
  }
  return { success: true, message: "Course registration submitted successfully" };
}