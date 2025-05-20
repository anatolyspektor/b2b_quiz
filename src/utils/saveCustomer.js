import { supabase } from "@/lib/supabase"

export const saveCustomer = async ({ name, email, sessionId, device, answers }) => {
  try {
    const { error } = await supabase.from("customers").insert({
      name,
      email,
      session_id: sessionId,
      device,
      answers, // store entire object
    })

    if (error) throw error
  } catch (err) {
    console.error("❌ Failed to save customer", err)
  }
}
