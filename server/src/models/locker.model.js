const mongoose = require("mongoose");
const lockerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  state: { type: Boolean, required: true },
  valor: { type: Number },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
});

module.exports = mongoose.model("Locker", lockerSchema);
