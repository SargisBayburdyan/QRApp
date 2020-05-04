const User = require("../database/User");
const mongoose = require("mongoose");
const msgs = require("./messages");

exports.userToDB = (req, res) => {
  const userData = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailPersonal: req.body.emailPersonal,
    emailBusiness: req.body.emailBusiness,
    phonePersonal: req.body.phonePersonal,
    phoneBusiness: req.body.phoneBusiness,
    street: req.body.street,
    zipcode: req.body.zipcode,
    country: req.body.country,
    website: req.body.website,
    company: req.body.company,
  });

  console.log(userData);

  User.findOne({ emailPersonal: req.body.emailPersonal }).then((user) => {
    // We have a new user! Send them a confirmation email.
    if (!user) {
      console.log("Done");
      /* User.create(userData)
        .then(() => res.json({ msg: msgs.qrgenerated }))
        .catch((err) => console.log(err));*/
    }
  });
};
