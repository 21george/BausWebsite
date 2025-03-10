"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getAboutme() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from("Aubout_me").select("*");
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data: data };
    } catch (error) {
        console.error(error, "error in getting Aubout_me");
        return { success: false, error: error.message };
    }
}