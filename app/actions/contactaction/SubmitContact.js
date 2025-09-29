"use server";
import { createClient } from "../../../utils/superbase/serverAction";

export async function submitcontact(formData) {
  const supabase = createClient();

  const fullname = formData.fullname;
  const email = formData.email;
  const telefone = formData.telefone;
  const date = formData.date;
  const message = formData.message;

  const { data, error } = await supabase.from("contact").insert([
    { fullname, email, telefone, date, message },
  ]);
  console.log(data, "submitcontact");
  if (error) {
    console.error(error, "error in submitting contact");
    return { success: false, error: error.message };
  }
  return { success: true, message: "RSVP submitted successfully" };
}