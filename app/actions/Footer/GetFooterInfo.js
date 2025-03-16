"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getFooterInfo() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.from("Footer").select("*");
        if (error) {
            return { success: false, error: error.message };
        }
       return {
      success: true,
      data: {
        Adresse: data?.Adresse ? [data.Adresse] : [],
        Telefon: data?.Phone_Number ? [data.Phone_Number] : [],
        EMail: data?.EMail ? [data.EMail] : [],
        Description: data?.description ? [data.description] : [],
      },
     };
    } catch (error) {
        console.error(error, "error in getting Footer");
        return { success: false, error: error.message };
    }
}
