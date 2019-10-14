const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  date: { type: Date, required: true },
  places: { type: Number },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  state: { type: Boolean, default: true }
});

module.exports = mongoose.model("Course", courseSchema);
