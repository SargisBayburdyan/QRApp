const mongoose = require("mongoose");
const String = mongoose.SchemaTypes.String;

//users collection
let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
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
  email: {
    type: String,
    default: "",
    required: true,
  },
  country: {
    type: String,
    default: "",
    required: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

//export DB Schema
module.exports = mongoose.model("User", userSchema);
