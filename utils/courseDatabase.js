import { createClient } from "./superbase/server";

export async function getOnlineCourses() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("online_courses")
            .select(`
                *,
                course_files (
                    id,
                    file_name,
                    file_type,
                    file_size_mb,
                    file_order
                )
            `)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in getOnlineCourses:", error);
        return { success: false, error: error.message };
    }
}

export async function getCourseById(courseId) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("online_courses")
            .select(`
                *,
                course_files (
                    id,
                    file_name,
                    file_type,
                    file_size_mb,
                    file_order
                )
            `)
            .eq('id', courseId)
            .eq('is_active', true)
            .single();

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in getCourseById:", error);
        return { success: false, error: error.message };
    }
}

export async function createCoursePurchase(purchaseData) {
    const supabase = await createClient();
    try {
        // Set download expiration to 7 days from now
        const downloadExpiresAt = new Date();
        downloadExpiresAt.setDate(downloadExpiresAt.getDate() + 7);

        const { data, error } = await supabase
            .from("course_purchases")
            .insert([{
                ...purchaseData,
                download_expires_at: downloadExpiresAt.toISOString()
            }])
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in createCoursePurchase:", error);
        return { success: false, error: error.message };
    }
}

export async function updatePurchaseStatus(paymentIntentId, status) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("course_purchases")
            .update({ 
                payment_status: status,
                updated_at: new Date().toISOString()
            })
            .eq('stripe_payment_intent_id', paymentIntentId)
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in updatePurchaseStatus:", error);
        return { success: false, error: error.message };
    }
}

export async function getPurchaseByToken(token) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("course_purchases")
            .select(`
                *,
                online_courses (
                    id,
                    title,
                    description,
                    course_files (
                        id,
                        file_name,
                        file_type,
                        file_size_mb,
                        storage_path,
                        file_order
                    )
                )
            `)
            .eq('download_token', token)
            .eq('payment_status', 'completed')
            .gte('download_expires_at', new Date().toISOString())
            .single();

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in getPurchaseByToken:", error);
        return { success: false, error: error.message };
    }
}

export async function incrementDownloadCount(purchaseId) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .rpc('increment_download_count', { purchase_id: purchaseId });

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        console.error("Error in incrementDownloadCount:", error);
        return { success: false, error: error.message };
    }
}

export async function logDownload(downloadData) {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("download_logs")
            .insert([downloadData]);

        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data: data };
    } catch (error) {
        console.error("Error in logDownload:", error);
        return { success: false, error: error.message };
    }
}