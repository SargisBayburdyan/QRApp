const mongoose = require("mongoose");
const String = mongoose.SchemaTypes.String;

//users collection
let userCardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    default: "",
    required: true,
  },
  lastName: {
    type: String,
    default: "",
    required: true,
  },
  birthDate: {
    type: String,
    default: "",
    required: false,
  },
  emailPersonal: {
    type: String,
    default: "",
    required: true,
  },
  emailBusiness: {
    type: String,
    default: "",
    required: true,
  },
  phonePersonal: {
    type: String,
    default: "",
    required: true,
  },
  phoneBusiness: {
    type: String,
    default: "",
    required: true,
  },
  street: {
    type: String,
    default: "",
    required: true,
  },
  zipcode: {
    type: String,
    default: "",
    required: true,
  },
  country: {
    type: String,
    default: "",
    required: true,
  },
  website: {
    type: String,
    default: "",
    required: false,
  },
  company: {
    type: String,
    default: "",
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

//export DB Schema
module.exports = mongoose.model("UserCard", userCardSchema);
