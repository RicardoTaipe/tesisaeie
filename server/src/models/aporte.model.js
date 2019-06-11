const mongoose = require("mongoose");

const aporteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  valor: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
});

module.exports = mongoose.model("Aporte", aporteSchema);
