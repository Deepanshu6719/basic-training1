const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const answerButtons = document.querySelectorAll(".answer-btn");

const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

const endScreen = document.getElementById("end-screen");
const endTitle = document.getElementById("end-title");
const endMessage = document.getElementById("end-message");
const finalScoreElement = document.getElementById("final-score");

const timerElement = document.getElementById("timer");

const playAgainButton = document.getElementById("play-again-btn");

const timerProgress = document.getElementById("timer-progress");

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
    timerId: null,
    timeLeft: 15,

    start: function () {
        startScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        this.loadQuestion();
    },

    loadQuestion: function () {
        try {
            if (!questions.length) {
                throw new Error("No questions available.");
            }

            if (this.usedQuestions.length === questions.length) {
                this.win();
                return;
            }

            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * questions.length);
            } while (this.usedQuestions.includes(randomIndex));

            const question = questions[randomIndex];

            if (
                !question.question ||
                !Array.isArray(question.options) ||
                question.options.length !== 4 ||
                typeof question.correctAnswerIndex !== "number"
            ) {
                throw new Error("Invalid question data.");
            }

            this.usedQuestions.push(randomIndex);

            questionElement.textContent = question.question;

            questionNumberElement.textContent =
                `Question ${this.usedQuestions.length}`;

            answerButtons.forEach(function (button, index) {
                button.textContent = question.options[index];
            });

            this.startTimer();

        } catch (error) {
            console.error(error);

            questionElement.textContent =
                "Sorry, we couldn't load the question.";

            questionNumberElement.textContent = "Error";

            answerButtons.forEach(function (button) {
                button.disabled = true;
            });

            clearInterval(this.timerId);
        }
    },

    checkAnswer: function (selectedIndex) {
        clearInterval(this.timerId);

        const questionIndex =
            this.usedQuestions[this.usedQuestions.length - 1];

        const question = questions[questionIndex];

        const selectedButton = answerButtons[selectedIndex];

        answerButtons.forEach(function (button) {
            button.disabled = true;
        });

        if (selectedIndex === question.correctAnswerIndex) {
            selectedButton.classList.add("answer-correct");

            this.score++;
            scoreElement.textContent = this.score;
        } else {
            selectedButton.classList.add("answer-wrong");

            this.lives--;
            livesElement.textContent = "❤️".repeat(this.lives);
        }

        setTimeout(() => {
            answerButtons.forEach(function (button) {
                button.disabled = false;
                button.classList.remove(
                    "answer-correct",
                    "answer-wrong"
                );
            });

            if (this.lives === 0) {
                this.gameOver();
                return;
            }

            if (this.usedQuestions.length === questions.length) {
                this.win();
                return;
            }

            this.loadQuestion();
        }, 400);
    },

    gameOver: function () {
        gameScreen.classList.add("hidden");
        endScreen.classList.remove("hidden");

        endTitle.textContent = "Game Over";
        endMessage.textContent = "You ran out of lives!";
        finalScoreElement.textContent = this.score;
    },
    win: function () {
        gameScreen.classList.add("hidden");
        endScreen.classList.remove("hidden");

        endTitle.textContent = "You Win!";
        endMessage.textContent =
            "Amazing! You defeated every question wave!";
        finalScoreElement.textContent = this.score;
    },
    startTimer: function () {
        clearInterval(this.timerId);

        this.timeLeft = 15;
        timerElement.textContent = this.timeLeft;
        timerProgress.style.width = "100%";

        this.timerId = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = this.timeLeft;

            const percentage = (this.timeLeft / 15) * 100;
            timerProgress.style.width = percentage + "%";

            if (this.timeLeft <= 5) {
                timerProgress.classList.add("timer-warning");
            } else {
                timerProgress.classList.remove("timer-warning");
            }

            if (this.timeLeft === 0) {
                this.handleTimeout();
            }
        }, 1000);
    },
    handleTimeout: function () {
        clearInterval(this.timerId);

        this.lives--;
        livesElement.textContent = "❤️".repeat(this.lives);

        if (this.lives === 0) {
            this.gameOver();
            return;
        }

        this.loadQuestion();
    },
    reset: function () {
        clearInterval(this.timerId);

        this.score = 0;
        this.lives = 3;
        this.currentQuestionIndex = 0;
        this.usedQuestions = [];
        this.timerId = null;
        this.timeLeft = 15;

        scoreElement.textContent = this.score;
        livesElement.textContent = "❤️❤️❤️";
        timerElement.textContent = this.timeLeft;
        timerProgress.style.width = "100%";
        timerProgress.classList.remove("timer-warning");

        endScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        this.loadQuestion();
    },
};

startButton.addEventListener("click", function () {
    game.start();
});
answerButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        game.checkAnswer(index);
    });
});
playAgainButton.addEventListener("click", function () {
    game.reset();
});



