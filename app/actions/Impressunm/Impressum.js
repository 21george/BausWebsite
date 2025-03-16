"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getImpress() {
    const supabase = await createClient();
    try {
        // Fetch data from the 'impressum' table
        const { data, error } = await supabase.from('impressum').select("*");

        // Handle Supabase-specific errors
        if (error) {
            console.error('Error fetching data:', error);
            return { success: false, error: error.message, data: null };
        }

        // Return the fetched data
        return { success: true, data: data, error: null };
    } catch (error) {
        // Handle unexpected errors
        console.error("Error in getImpress:", error);
        return { success: false, error: error.message, data: null };
    }
}