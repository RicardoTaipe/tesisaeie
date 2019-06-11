const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  date: { type: String, required: true },
  places: { type: Number },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

module.exports = mongoose.model("Course", courseSchema);
