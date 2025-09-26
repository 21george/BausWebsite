"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getKurseRegistrations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("kurse_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching course registrations:", error);
    return [];
  }

  return data || [];
}