const mongoose = require("mongoose");
const { userSchema } = require("../schemas/userSchema");

// Create and export the User model
const Usermodel = mongoose.model("user", userSchema);

module.exports = Usermodel;
