const mongoose = require("mongoose");

const adsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date }
});

module.exports = mongoose.model("Ads", adsSchema);
