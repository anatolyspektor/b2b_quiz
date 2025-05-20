export const sendSlackCallBooked = async ({ session_id, test_name, variant, device, metadata = {} }) => {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

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


export const sendSlackEmailAdded = async ({ session_id, name, email, answers }) => {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  const fields = Object.entries(answers)
    .map(([key, val]) => `*${key}*: ${Array.isArray(val) ? val.join(", ") : val}`)
    .join("\n");

  const message = {
    text: `📩 New Lead Captured from 2-Minute-Quiz`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📩 *New Lead Captured from 2-Minute-Quiz!*\n• *Session:* \`${session_id}\`\n👤 *Name:* ${name || "n/a"}\n📧 *Email:* ${email || "n/a"}\n`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📝 *Answers:*\n${fields}`,
        },
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error("❌ Failed to send Slack email_added message:", err);
  }
};


