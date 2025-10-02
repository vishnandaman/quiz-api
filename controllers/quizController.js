const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { text } = require("body-parser");

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("title");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const newQuiz = new Quiz({ title });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addQuestion = async (req, res) => {
  const { quizId } = req.params;
  const { title, options, correctOptionIndex } = req.body;

  if (
    !title ||
    !Array.isArray(options) ||
    options.length < 2 ||
    typeof correctOptionIndex !== "number" ||
    correctOptionIndex < 0 ||
    correctOptionIndex >= options.length
  ) {
    return res.status(400).json({
      message:
        "Invalid question data provided. Ensure title, options array (min 2), and a valid correctOptionIndex are present.",
    });
  }

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const newQuestion = new Question({
      title,
      options: options.map((opt) => ({ text: opt })),
    });

    newQuestion.correctOptionId = newQuestion.options[correctOptionIndex]._id;

    await newQuestion.save();

    quiz.questions.push(newQuestion._id);
    await quiz.save();

    const questionResponse = newQuestion.toObject();
    delete questionResponse.correctOptionId;

    res.status(201).json(questionResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizQuestions = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: "questions",
      select: "-correctOptionId",
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Answers array is required." });
  }
  try {
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const total = quiz.questions.length;

    for (const answer of answers) {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId
      );
      if (
        question &&
        question.correctOptionId.toString() === answer.selectedOptionId
      ) {
        score++;
      }
    }
    res.status(200).json({ score, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
