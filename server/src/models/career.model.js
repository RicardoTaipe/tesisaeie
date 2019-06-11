const mongoose = require("mongoose");
const careerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model("Career", careerSchema);
