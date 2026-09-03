//Nodemailer
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //defind email options
  const mailOpts = {
    form: "E-shop App <emrandevelopment@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send email
  await transporter.sendMail(mailOpts);
};
module.exports = sendEmail;
