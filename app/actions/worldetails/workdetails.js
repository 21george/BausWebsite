"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getWorkdetailsById(id) {
    const supabase = await createClient();
 try {
        // First get work details
        const { data: workDetail, error: workError } = await supabase
            .from("workdetails")
            .select("*")
            .eq("id", id)
            .single();
        
        if (workError) throw workError;
        if (!workDetail) {
            return { success: false, error: "Work detail not found", status: 404 };
        }

        // Then get Heilkunde info (you might want to filter this)
        const { data: heilkundeData, error: heilkundeError } = await supabase
            .from("HeilkundeInfos")
            .select("*");
        
        if (heilkundeError) throw heilkundeError;

        // Combine the data
        const combinedData = {
            ...workDetail,
            HeilkundeInfos: heilkundeData
        };

        return { success: true, data: combinedData };
    } catch (error) {
        return { 
            success: false, 
            error: error.message || "Failed to fetch work detail",
            status: error.status || 500
        };
    }
}

export async function getAllWorkdetails() {
    const supabase = await createClient();
    try {
        // Option 1: If you have an 'id' column you can sort by
        const { data, error } = await supabase
            .from("workdetails")
            .select("*")
            .order("id", { ascending: false }); // Changed from created_at to id
        
        // Option 2: If you don't want any sorting
        // const { data, error } = await supabase
        //     .from("workdetails")
        //     .select("*");
            
        if (error) throw error;
        return { success: true, data: data || [] };
    } catch (error) {
        return { 
            success: false, 
            error: error.message || "Failed to fetch work details",
            status: error.status || 500
        };
    }
}