const mongoose = require("mongoose");
const { text } = require("body-parser");

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  correctOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuizSchema);
