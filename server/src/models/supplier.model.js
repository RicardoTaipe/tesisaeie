const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String }
});

module.exports = mongoose.model("Supplier", supplierSchema);
