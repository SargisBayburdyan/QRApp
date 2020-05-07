const { CLIENT_ORIGIN } = require("../configs/config");

//Information and Link sent in the email for confirmation
module.exports = {
  confirmForPassReset: (id) => ({
    subject: "Confirm your email to reset your password",
    html: `
      <a href='${CLIENT_ORIGIN}/#/resetpassword/${id}'>
        Click here
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/#/resetpassword/${id}`,
  }),
};
