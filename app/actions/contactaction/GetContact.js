"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getContact() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from("InformationContact").select("*");
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data: data };
    } catch (error) {
        console.error(error, "error in getting InformationContact");
        return { success: false, error: error.message };
    }
}