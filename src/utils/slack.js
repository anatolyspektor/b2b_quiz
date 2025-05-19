export const sendSlackCallBooked = async ({ session_id, test_name, variant, device, metadata = {} }) => {
  const webhookUrl = "https://lfyqxjzskbnisxozwzdk.supabase.co/functions/v1/slack-hook"

  const {
    attendeeName = "n/a",
    email = "n/a",
    eventTitle = "n/a",
    startTime = "",
  } = metadata

  const message = {
    text: `📞 New Call Booked!`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n-----\n📞 *New Call Booked from 2-Minute-Quiz*\n• *Session:* \`${session_id}\`\n• *Test:* ${test_name || "n/a"}\n• *Variant:* ${variant || "n/a"}\n• *Device:* ${device}\n👤 *Name:* ${attendeeName}\n📧 *Email:* ${email}\n📅 *Time:* ${startTime ? new Date(startTime).toLocaleString() : "n/a"}\n📌 *Event:* ${eventTitle}`,
        },
      },
    ],
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
  } catch (err) {
    console.error("❌ Failed to send Slack call_booked message:", err)
  }
}


export const sendSlackEmailAdded = async ({ session_id, name, email }) => {
  const webhookUrl = "https://lfyqxjzskbnisxozwzdk.supabase.co/functions/v1/slack-hook"

  const message = {
    text: `📩 New Lead Captured from 2-Minute-Quiz`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n--------\n\n📩 *New Lead Captured from 2-Minute-Quiz!*\n• *Session:* \`${session_id}\`\n👤 *Name:* ${name || "n/a"}\n📧 *Email:* ${email || "n/a"}\n\n`,
        },
      },
    ],
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
  } catch (err) {
    console.error("❌ Failed to send Slack email_added message:", err)
  }
}

