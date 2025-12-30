const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String
});

module.exports = mongoose.model("Note", noteSchema);
