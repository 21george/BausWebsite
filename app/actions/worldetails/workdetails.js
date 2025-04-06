"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getWorkdetailsById(id) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("workdetails")
            .select("*")
            .eq("id", id)
            .single(); // Using single() instead of checking data.length
        
        if (error) throw error;
        if (!data) {
            return { success: false, error: "Work detail not found", status: 404 };
        }
        
        return { success: true, data };
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