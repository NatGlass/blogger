import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendVerificationCode(
  email: string,
  code: string
): Promise<void> {
  if (!process.env.FROM_EMAIL) {
    throw new Error("Missing FROM_EMAIL");
  }

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Verify your email",
    text: `Your verification code is ${code}`,
    html: `<strong>Your verification code is ${code}</strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
