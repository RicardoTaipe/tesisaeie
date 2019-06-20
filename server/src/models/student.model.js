const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  names: { type: String, required: true },
  lastnames: { type: String, required: true },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },
  cedula: { type: String, required: true },
  numero_unico: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }
});

module.exports = mongoose.model("Student", studentSchema);
