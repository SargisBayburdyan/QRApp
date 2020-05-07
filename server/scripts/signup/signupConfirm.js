const User = require("../../database/User");
const mongoose = require("mongoose");
const messages = require("../messages");
const emailSend = require("../email/emailSend");
const signupTemplate = require("../email/signupTemplate");

exports.confirmEmail = (req, res) => {
  console.log("Confirmation in Process");
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      // A user with that id does not exist in the DB. Perhaps some tricky
      // user tried to go to a different url than the one provided in the
      // confirmation email.
      if (!user) {
        res.json({ msg: messages.emailcouldNotFind });
      }

      // The user exists but has not been confirmed. We need to confirm this
      // user and let them know their email address has been confirmed.
      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: messages.emailconfirmed }))
          .catch((err) => console.log(err));
      }

      // The user has already confirmed this email address.
      else {
        res.json({ msg: messages.emailalreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};
