const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  state: { type: Boolean, default: true }
});

module.exports = mongoose.model("Category", categorySchema);
