const { CLIENT_ORIGIN } = require("../../configs/config");

//Information and Link sent in the email for confirmation
module.exports = {
  confirm: (id) => ({
    subject: "Welcome to Qard. Please confirm your email for Signup",
    html: `
      <a href='${CLIENT_ORIGIN}/#/confirm/${id}'>
        Click here for Confirmation
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/#/confirm/${id}`,
  }),
};
