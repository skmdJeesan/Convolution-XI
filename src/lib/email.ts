import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  // Use a real SMTP service (Resend, SendGrid, AWS SES) in production
  // For dev, you can use Gmail (with App Password) or Mailtrap
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: '"Convolution tech team" <no-reply@myapp.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>
           <p>Or copy this link: ${verificationUrl}</p>`,
  };

  await transporter.sendMail(mailOptions);
};