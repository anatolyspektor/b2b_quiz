import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ThankYou() {
  useEffect(() => {
    const alreadyTracked = localStorage.getItem("call_booked_tracked")
    if (alreadyTracked) return

    const sessionId = localStorage.getItem("session_id") || "anonymous"
    const test_name = localStorage.getItem("test_name") || null
    const variant = localStorage.getItem("variant") || null
    const device = window.innerWidth < 768 ? "mobile" : "desktop"

    supabase.from("events").insert([
      {
        event: "call_booked",
        session_id: sessionId,
        test_name,
        variant,
        device,
      }
    ])

    localStorage.setItem("call_booked_tracked", "true")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-[#1E3A40]">
      <div className="bg-[#F1FDED] text-[#1E3A40] text-center rounded-2xl shadow-2xl w-full max-w-xl p-8 sm:p-12 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">🎉 Call Booked!</h1>
        <p className="text-xl sm:text-2xl text-[#FF8257] font-medium">
          We’re excited to see you. Check your email for details!
        </p>
      </div>
    </div>
  )
}