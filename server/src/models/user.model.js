const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  names: { type: String, required: true },
  lastnames: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
});

module.exports = mongoose.model("User", userSchema);
