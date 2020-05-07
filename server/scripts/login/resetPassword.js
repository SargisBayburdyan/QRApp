const sendEmail = require("../email/email.send");
const { DB_URL } = require("../configs/config");
const mongoose = require("mongoose");
const templates = require("../email/email.resetpass.templates");
const assert = require("assert");
const bcrypt = require("bcrypt");
const User = require("../database/User");

exports.checkEmailForReset = (req, res) => {
  const emailFromBody = req.body.emailForReset;

  mongoose.connect(
    DB_URL,
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    function (err, db) {
      try {
        db.collection("users")
          .findOne({ email: emailFromBody })
          .then((user) => {
            // Send them a confirmation email.
            if (user) {
              sendEmail(
                user.email,
                templates.confirmForPassReset(user._id)
              ).catch((err) => console.log(err));
            }
            console.log(user._id);
          });
      } catch (err) {
        console.log(err);
      }
    }
  );
};

exports.emailForResetPassConfirmed = (req, res) => {
  const { id } = req.params;
};

exports.updatePassword = (req, res) => {
  const { id } = req.params;
  const password = req.body.password;

  User.findById(id)
    .then((user) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;

          newPassword = hash;

          mongoose.connect(
            DB_URL,
            {
              useUnifiedTopology: true,
              useCreateIndex: true,
              useNewUrlParser: true,
            },
            function (err, db) {
              try {
                assert.equal(null, err);
                //TODO: Change the code below
                User.findById(id).updateOne(
                  { _id: id },
                  { $set: { password: newPassword } },

                  function (err, result) {
                    assert.equal(null, err);
                    res.json({ status: 200 });
                    console.log("Password Updated");
                  }
                );
                /////////////////////////////////////////
              } catch (err) {
                console.log(err);
              }
            }
          );
        }
      });
    })

    .catch((err) => console.log(err));
};
