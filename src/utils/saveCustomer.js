import { supabase } from "@/lib/supabase"

export const saveCustomer = async ({ name, email, sessionId, device,answers, score, workHrs,zone, bleedPerWeek, chokePoints, color
}) => {
  try {
    const { error } = await supabase.from("customers").insert({
      name,
      email,
      session_id: sessionId,
      device,
      answers,
      score,
      work_hrs: workHrs,
      zone,
      bleed_per_week: bleedPerWeek,
      choke_points: chokePoints,
    });

    if (error) throw error;
  } catch (err) {
    console.error("❌ Failed to save customer", err);
  }
};
