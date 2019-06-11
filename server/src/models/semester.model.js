const mongoose = require("mongoose");
const semesterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model("Semester", semesterSchema);
