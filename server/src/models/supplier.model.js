const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String },
  state: { type: Boolean, default: true }
});

module.exports = mongoose.model("Supplier", supplierSchema);
