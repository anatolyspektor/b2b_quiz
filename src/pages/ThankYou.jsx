import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { sendSlackCallBooked } from "@/utils/slack"

export default function ThankYou() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  useEffect(() => {
    const alreadyTracked = localStorage.getItem("call_booked_tracked")
    if (alreadyTracked) return

    const session_id = localStorage.getItem("session_id") || "anonymous"
    const test_name = localStorage.getItem("test_name") || null
    const variant = localStorage.getItem("variant") || null
    const device = window.innerWidth < 768 ? "mobile" : "desktop"

    const attendeeName = params.get("attendeeName") || "n/a"
    const email = params.get("email") || "n/a"
    const eventTitle = params.get("title") || "n/a"
    const startTime = params.get("startTime") || ""

    const metadata = {
      attendeeName,
      email,
      eventTitle,
      startTime,
    }

    const trackCallBooked = async () => {
      const { error } = await supabase.from("events").insert([
        {
          event: "call_booked",
          session_id,
          test_name,
          variant,
          device,
          metadata,
        }
      ])

      if (error) {
        console.error("❌ Failed to track call_booked event:", error)
      } else {
        localStorage.setItem("call_booked_tracked", "true")
        sendSlackCallBooked({ session_id, test_name, variant, device, metadata })
      }
    }

    trackCallBooked()
  }, [search])

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
