"use server";
import { createClient } from "../../../utils/superbase/server";

export async function getImpressumContent() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('impressum_content')
            .select("*")
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching impressum data:', error);
            return { success: false, error: error.message, data: null };
        }

        // Transform data into a more usable format
        const transformedData = {};
        data.forEach(item => {
            transformedData[item.section_key] = {
                title: item.title,
                content: item.content,
                additionalData: item.additional_data,
                id: item.id
            };
        });

        return { success: true, data: transformedData, error: null };
    } catch (error) {
        console.error("Error in getImpressumContent:", error);
        return { success: false, error: error.message, data: null };
    }
}

export async function updateImpressumContent(sectionKey, updates) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('impressum_content')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('section_key', sectionKey)
            .select()
            .single();

        if (error) {
            console.error('Error updating impressum data:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data };
    } catch (error) {
        console.error("Error in updateImpressumContent:", error);
        return { success: false, error: error.message };
    }
}