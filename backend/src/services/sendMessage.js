// AngularApp\echodrop\backend\src\services\sendMessage.js
import nodemailer from "nodemailer";
import twilio from "twilio";
import { google } from 'googleapis';

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Configure Google OAuth2 client (single instance)
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function sendMessage(msg) {
  switch (msg.platform) {
    case "email":
      return sendEmail(msg);
    case "sms":
      return sendSms(msg);
    case "whatsapp":
      return sendWhatsapp(msg);
    default:
      throw new Error("Unsupported platform: " + msg.platform);
  }
}

// Updated sendEmail function with OAuth 2.0
async function sendEmail(msg) {
  if (!msg.recipient.includes("@")) throw new Error("Invalid email");

  try {
    console.log("🔄 Setting up Gmail API...");
    
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const { token } = await oAuth2Client.getAccessToken();
    oAuth2Client.setCredentials({ access_token: token });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Create the email message
    const message = [
      `From: ${process.env.EMAIL_USER}`,
      `To: ${msg.recipient}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${msg.subject || "EchoDrop Message"}`,
      '',
      msg.content
    ].join('\n');

    // Encode the message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log("🔄 Sending via Gmail API...");
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    console.log("✅ Email sent via Gmail API!");
    console.log("Message ID:", result.data.id);
    
  } catch (error) {
    console.error("❌ Gmail API failed:", error);
    throw new Error("Failed to send email: " + error.message);
  }
}

// sendSms function
async function sendSms(msg) {
  if (!/^\+?[1-9]\d{1,14}$/.test(msg.recipient)) {
    throw new Error("Invalid phone number format (E.164 required)");
  }

  await client.messages.create({
    body: msg.content,
    from: process.env.TWILIO_SMS_PHONE,
    to: msg.recipient,
  });
  console.log("✅ SMS sent to", msg.recipient);
}

// sendWhatsapp function
async function sendWhatsapp(msg) {
  let recipient = msg.recipient.trim();

  // Auto-fix if user forgot to add 'whatsapp:'
  if (!recipient.startsWith("whatsapp:")) {
    recipient = "whatsapp:" + recipient;
  }

  await client.messages.create({
    body: msg.content,
    from: "whatsapp:" + process.env.TWILIO_WHATSAPP_PHONE,
    to: recipient,
  });

  console.log("✅ WhatsApp sent to", recipient);
}
