"use stict";
require("dotenv").config();
const nodemailer = require("nodemailer");

//email credentials for the sender mail
const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // These environment variables will be pulled from the .env file
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};

// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
const transporter = nodemailer.createTransport(credentials);

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (to, content) => {
  // The from and to addresses for the email that is about to be sent.
  const contacts = {
    from: process.env.MAIL_USERNAME,
    to,
  };

  // Combining the content and contacts into a single object that can
  // be passed to Nodemailer.
  const email = Object.assign({}, content, contacts);

  async function main() {
    try {
      var mail = await transporter.sendMail(email);
      console.log(mail);
    } catch (error) {
      console.log(error);
    }
  }
  main();
};
