"use server";
import { createClient } from "../../../utils/superbase/server";
export async function uploadWorkImage(file, fileName, workId) {
  const supabase = createClient();
  
  try {
    // Upload image to storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('work-images')
      .upload(`${workId}/${fileName}`, file);
    
    if (uploadError) throw uploadError;

    // Get public URL of the uploaded image
    const { data: urlData } = supabase
      .storage
      .from('work-images')
      .getPublicUrl(`${workId}/${fileName}`);

    // Update workdetails record with image URL
    const { error: updateError } = await supabase
      .from('workdetails')
      .update({ image: urlData.publicUrl })
      .eq('id', workId);

    if (updateError) throw updateError;

    return { success: true, imageUrl: urlData.publicUrl };
  } catch (error) {
    return { success: false, error: error.message };
  }
}