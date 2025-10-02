const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/", quizController.getAllQuizzes);

router.post("/", quizController.createQuiz);

router.post("/:quizId/questions", quizController.addQuestion);

router.get("/:quizId/questions", quizController.getQuizQuestions);

router.post("/:quizId/submit", quizController.submitQuiz);

module.exports = router;
