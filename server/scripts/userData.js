const User = require("../database/User");
const mongoose = require("mongoose");
const msgs = require("./messages");
let QRCode = require("qr-image");
let fs = require("fs");

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
      User.create(userData)
        .then(() => {
          QRCode.image(JSON.stringify(userData), {
            type: "png",
            size: 10,
            ec_level: "H",
          }).pipe(fs.createWriteStream("MyQRCode.png"));
        })

        .then(() => res.json({ msg: msgs.qrgenerated }))
        .catch((err) => console.log(err));
    } else if (user) {
      res.json({ msg: msgs.alreadyexists });
    }
  });
};
