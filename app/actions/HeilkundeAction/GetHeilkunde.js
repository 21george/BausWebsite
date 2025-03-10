"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getHeilkundeInfo() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from("HeilkundeInfos").select("*");
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data: data };
    } catch (error) {
        console.error(error, "error in getting HeilkundeInfos");
        return { success: false, error: error.message };
    }
}
