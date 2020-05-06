const UserCard = require("../database/UserCard");
const mongoose = require("mongoose");
const msgs = require("./messages");
let QRCode = require("qr-image");
let fs = require("fs");

exports.userToDB = (req, res) => {
  const userCardData = new UserCard({
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

  console.log(userCardData);

  UserCard.findOne({ emailPersonal: req.body.emailPersonal }).then(
    (userCard) => {
      // We have a new user! Send them a confirmation email.
      if (!userCard) {
        UserCard.create(userCardData)
          .then(() => {
            QRCode.image(JSON.stringify(userCardData), {
              type: "png",
              size: 5,
              ec_level: "H",
            }).pipe(
              fs.createWriteStream(
                `${req.body.firstName + " " + req.body.lastName}  vCard.png`
              )
            );
          })

          .then(() => res.json({ msg: msgs.qrgenerated }))
          .catch((err) => console.log(err));
      } else if (user) {
        res.json({ msg: msgs.alreadyexists });
      }
    }
  );
};
