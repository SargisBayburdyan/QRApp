const User = require("../../database/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const messages = require("../messages");
const emailSend = require("../email/emailSend");
const signupTemplate = require("../email/signupTemplate");

exports.signupData = (req, res) => {
  const userInfo = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  User.findOne({ email: req.body.email })
    .then((user) => {
      // We have a new user! Send them a confirmation email.
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userInfo.password = hash;
          User.create(userInfo)

            .then((user) =>
              emailSend(user.email, signupTemplate.confirm(user._id))
            )
            .then(() => res.json({ msg: messages.emailconfirm }))
            .catch((err) => console.log(err));
        });
      }

      // We have already seen this email address. But the user has not
      // clicked on the confirmation link. Send another confirmation email.
      else if (user && !user.confirmed) {
        emailSend(user.email, signupTemplate.confirm(user._id)).then(() =>
          res.json({ msg: messages.emailresend })
        );
      }

      // The user has already confirmed this email address
      else {
        res.json({ msg: messages.emailalreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};
