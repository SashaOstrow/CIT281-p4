const p4 = require("./p4-module");
// Include express module, and create an instance of express
const express = require("express");
const app = express();

app.use(express.json());

const questions = p4.getQuestions();
console.log(questions);

const answers = p4.getAnswers();
console.log(answers);

const questionAnswers = p4.getQuestionsAnswers();
console.log(questionAnswers);

const question = p4.getQuestion();
console.log(question);

const answer = p4.getAnswer();
console.log(answer);

const questionAnswer = p4.getQuestionAnswer();
console.log(questionAnswer);

// Set listen IP and port
const listenPort = 8080;
const listenIP = "127.0.0.1";

// Middleware to parse JSON bodies
app.use(express.json());

// GET / questions
app.get("/cit/questions", (req, res) => {
  const questions = p4.getQuestions();
  res.json({
    error: "",
    statusCode: 200,
    questions: questions,
  });
});

// GET / answers
app.get("/cit/answers", (req, res) => {
  const answers = p4.getAnswers();
  res.json({
    error: "",
    statusCode: 200,
    answers: answers,
  });
});

// GET / questionAnswer
app.get("/cit/questionAnswer", (req, res) => {
  const questionAnswer = p4.getQuestionsAnswers();
  res.json({
    error: "",
    statusCode: 200,
    question_answers: questionAnswer,
  });
});
// GET / :number
app.get("/cit/question/:number", (req, res) => {
  const number = req.params.number;
  const result = p4.getQuestion(number);

  const statusCode = result.error ? 400 : 200;

  res.status(statusCode).json({
    error: result.error,
    statusCode: statusCode,
    question: result.question,
    number: result.number,
  });
});

// GET / :answer
app.get("/cit/answer/:number", (req, res) => {
  const number = req.params.number;
  const result = p4.getAnswer(number);

  const statusCode = result.error ? 400 : 200;

  res.status(statusCode).json({
    error: result.error,
    statusCode: statusCode,
    answer: result.answer,
    number: result.number,
  });
});
// GET / questionanswer
app.get("/cit/questionanswer/:number", (req, res) => {
  const number = req.params.number;
  const result = p4.getQuestionAnswer(number);

  const statusCode = result.error ? 400 : 200;

  res.status(statusCode).json({
    error: result.error,
    statusCode: statusCode,
    question: result.question,
    answer: result.answer,
    number: result.number,
  });
});

app.post("/cit/question", (req, res) => {
  const info = req.body;
  const result = p4.addQuestionAnswer(info);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
      statusCode: 400,
    });
  }

  res.status(201).json({
    error: "",
    statusCode: 201,
    number: result.number,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    statusCode: 404,
  });
});

// Start the server
app.listen(listenPort, listenIP, () => {
  console.log(`Server running at http://${listenIP}:${listenPort}`);
});
