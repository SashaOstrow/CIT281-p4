const data = require("./p4-data").data;
console.log(data);

//loops through data question
function getQuestions() {
  return data.map((item) => item.question);
}
//loops through data answer
function getAnswers() {
  return data.map((item) => item.answer);
}
//clone each object to avoid mutating original data
function getQuestionsAnswers() {
  return data.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}
//makes default vlaue if number is not passed
function getQuestion(number = "") {
  const index = Number(number) - 1;
  const result = {
    question: "",
    number: Number(number),
    error: "",
  };

  //if else statemnet chekcs if there number or if empty, makes sure number is in range and if it passes it runs the input
  if (Number.isNaN(index) || number === "") {
    result.error = "Must be a valid number";
  } else if (index < 0 || index >= data.length) {
    result.error = `Question must be between 1-${data.length}`;
  } else {
    result.question = data[index].question;
  }
  return result;
}

function getAnswer(number = "") {
  const index = Number(number) - 1;
  const result = {
    answer: "",
    number: Number(number),
    error: "",
  };
  //gives error
  if (Number.isNaN(index) || number === "") {
    result.error = "Must be a valid number";
  } else if (index < 0 || index >= data.length) {
    result.error = `Number must be between 1-${data.lenght}`;
  } else {
    result.answer = data[index].answer;
  }

  return result;
}

function getQuestionAnswer(number = "") {
  const index = Number(number) - 1;
  const result = {
    question: "",
    answer: "",
    number: Number(number),
    error: "",
  };

  //checks if input is not a number of is left as empty
  //gives error
  if (Number.isNaN(index) || number === "") {
    result.error = "Must be vaild number";
  } else if (index < 0 || index >= data.length) {
    result.error = `Number must be between 1-${data.length}`;
  } else {
    result.question = data[index].question;
    result.answer = data[index].answer;
  }

  return result;
}

function addQuestionAnswer(info = {}) {
  const result = {
    error: "",
    message: "",
    number: null,
  };

  if (!info.question || !info.answer) {
    result.error = "Object must have both question and answer ";
    return result;
  }

  data.push({
    question: info.question,
    answer: info.answer,
  });

  result.message = "Question added successfully.";
  result.number = data.length;
  return result;
}

function updateQuestionAnswer(info = {}) {
  const result = {
    error: "",
    message: "",
  };

  const index = Number(info.number) - 1;

  if (Number.isNaN(index) || index < 0 || index >= data.length) {
    result.error = `Question number must be between 1-${data.length}`;
    return result;
  }

  if (!info.question && !info.answer) {
    result.error =
      "No update values provided. Must include question and/or answer";
    return result;
  }

  // Perform the update
  if (info.question) {
    data[index].question = info.question;
  }

  if (info.answer) {
    data[index].answer = info.answer;
  }

  result.message = `Question #${info.number} updated`;
  return result;
}

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
};

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = true;
const testGetAs = true;
const testGetQsAs = true;
const testGetQ = true;
const testGetA = true;
const testGetQA = true;
const testAdd = true; // Extra credit
const testUpdate = true; // Extra credit
const testDelete = false; // Extra credit

// getQuestions()
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() }, // Extra credit: +1
    { d: "(0)", f: getQuestion(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) } // Extra credit: +1
  );
}

// getAnswer()
if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() }, // Extra credit: +1
    { d: "(0)", f: getAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) } // Extra credit: +1
  );
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() }, // Extra credit: +1
    { d: "(0)", f: getQuestionAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) } // Extra credit: +1
  );
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}
