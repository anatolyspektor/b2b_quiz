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


export const sendSlackEmailAdded = async ({
  session_id,
  name,
  email,
  answers,
  score,
  workHrs,
  zone,
  color,
  bleedPerWeek,
  chokePoints = [],
}) => {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  const fields = Object.entries(answers)
    .map(([key, val]) => `*${key}*: ${Array.isArray(val) ? val.join(", ") : val}`)
    .join("\n");

  const chokePointText = chokePoints.length > 0
    ? chokePoints.map((p) => `• ${p.replace(/<[^>]*>/g, "")}`).join("\n")
    : "None";

  const summary = `
• *Score:* ${score}
• *Zone:* ${zone}
• *Hours/Week:* ${workHrs}
• *Bleed/Week:* $${Math.round(bleedPerWeek).toLocaleString()}
`;

  const message = {
    text: `📩 New Lead Captured from 2-Minute-Quiz`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📩 *New Lead Captured from 2-Minute-Quiz!*\n• *Session:* \`${session_id}\`\n👤 *Name:* ${name || "n/a"}\n📧 *Email:* ${email || "n/a"}\n${summary}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `🚧 *Choke Points:*\n${chokePointText}`,
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
