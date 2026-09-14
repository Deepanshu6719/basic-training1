const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const answerButtons = document.querySelectorAll(".answer-btn");

const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");


const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "SQL"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "constant"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "<!-- -->",
            "/* */",
            "//",
            "#"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Which HTTP method is normally used to retrieve data?",
        options: [
            "POST",
            "GET",
            "DELETE",
            "PATCH"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Which Git command creates a new branch?",
        options: [
            "git branch",
            "git merge",
            "git clone",
            "git push"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Which SQL command is used to retrieve data?",
        options: [
            "INSERT",
            "UPDATE",
            "SELECT",
            "DELETE"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Which data type represents true or false?",
        options: [
            "String",
            "Number",
            "Boolean",
            "Array"
        ],
        correctAnswerIndex: 2
    }
];

const game = {
    score: 0,
    lives: 3,
    currentQuestionIndex: 0,
    usedQuestions: [],

    start: function () {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    this.loadQuestion();
},

  loadQuestion: function () {
    if (this.usedQuestions.length === questions.length) {
        console.log("All questions completed");
        return;
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (this.usedQuestions.includes(randomIndex));

    this.usedQuestions.push(randomIndex);

    const question = questions[randomIndex];

    questionElement.textContent = question.question;
    questionNumberElement.textContent =
        `Question ${this.usedQuestions.length}`;

    answerButtons.forEach(function (button, index) {
        button.textContent = question.options[index];
    });
},

    checkAnswer: function () {
        console.log("Checking the answer...");
    }
};

startButton.addEventListener("click", function () {
    game.start();
});