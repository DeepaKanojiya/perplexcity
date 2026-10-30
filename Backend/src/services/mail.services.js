import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.Google_USER,
    pass: process.env.Google_PASSWORD,
    clientId: process.env.Google_CLIENT_ID,
    clientSecret: process.env.Google_CLIENT_SECRET,
    refreshToken: process.env.Google_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email tranporter is ready for send emails");
  })
  .catch((err) => {
    console.error("Error while verifying eamil transporter", err);
  });

export async function sendEmail({ to, subject, text, html }) {
  try {
    const mailOption = {
      from: `perplexcity <${process.env.Google_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const details = await transporter.sendMail(mailOption);
    console.log("Email sent successfully", details);
  } catch (error) {
    console.error("Error while sending email", error);
  }
}
