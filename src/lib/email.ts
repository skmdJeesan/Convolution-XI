import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  // Use a real SMTP service (Resend, SendGrid, AWS SES) in production
  // For dev, you can use Gmail (with App Password) or Mailtrap
  //console.log("=== DEBUG EMAIL URL ===", process.env.NEXTAUTH_URL);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "team.convoxi@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const baseUrl = process.env.APP_URL || "https://www.convolutionjuee.com";
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  const mailOptions = {
    from: '"Convolution tech team" <team.convoxi@gmail.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>
           <p>Or copy this link: ${verificationUrl}</p>`,
  };

  await transporter.sendMail(mailOptions);
};