const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = transporter.sendMail({
      from: `This email send from Anuj Kumar Gupta`,
      to: `${email}`,
      subject: `${title},`,
      html: `${otp}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log("Error during sending email otp", error);
  }
};
module.exports = mailSender;
