const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "F. Scott Fitzgerald"],
        correctAnswer: "Harper Lee",
    }
];

let currentQuestion = 0;
let score = 0;
const selectedAnswers = {};

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const submitButton = document.getElementById("submit-button");

    if (currentQuestion >= quizQuestions.length) {
        showFinalScore();
        return;
    }

    questionContainer.textContent = quizQuestions[currentQuestion].question;
    optionsContainer.innerHTML = "";

    quizQuestions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.onclick = () => selectAnswer(option);
        
        if (selectedAnswers[currentQuestion] === option) {
            button.classList.add("selected");
        }
        
        optionsContainer.appendChild(button);
    });

    progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
    progressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    if (currentQuestion === quizQuestions.length - 1) {
        submitButton.classList.remove("hidden");
    } else {
        submitButton.classList.add("hidden");
    }
}

function selectAnswer(option) {
    selectedAnswers[currentQuestion] = option;
    if (option === quizQuestions[currentQuestion].correctAnswer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    displayQuestion();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function showFinalScore() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `<h2>Your Final Score: ${score} / ${quizQuestions.length}</h2>`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-button").addEventListener("click", nextQuestion);
    document.getElementById("prev-button").addEventListener("click", previousQuestion);
    document.getElementById("submit-button").addEventListener("click", showFinalScore);
    displayQuestion();
});
