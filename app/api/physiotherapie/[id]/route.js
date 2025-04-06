import { createClient } from "../../../../utils/superbase/server";

export async function GET(request, { params }) {
  const supabase = await createClient();
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("Physiotherapie")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return new Response(JSON.stringify({ success: false, error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}