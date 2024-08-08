const quizzes = {
    generalKnowledge: [
        { question: "What is the capital of India?", answers: ["Jammu kashmir", "Karnataka", "Kerla", "Delhi"], correct: "Delhi", hint: "It's known as the city of metro cases." },
        { question: "Who is father of Nation?", answers: ["Indira gandhi", "Mahatma gandhi", "jawaharlal Nehru", "Narendra modi"], correct: "Mahatma gandhi", hint: "He was known as bappu '." },
        { question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: "Pacific Ocean", hint: "It is the deepest and largest ocean." },
        { question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Pb", "Fe"], correct: "Au", hint: "It’s named after the Latin word for gold." }
    ],
    math: [
        { question: "What is 5 + 7?", answers: ["12", "14", "10", "15"], correct: "12", hint: "It's the result of adding 5 and 7." },
        { question: "What is 12 x 8?", answers: ["96", "84", "88", "76"], correct: "96", hint: "It’s a two-digit number." },
        { question: "What is 25 divided by 5?", answers: ["5", "10", "20", "15"], correct: "5", hint: "It’s a single-digit number." },
        { question: "What is the square root of 81?", answers: ["9", "8", "7", "10"], correct: "9", hint: "It’s the number that multiplied by itself gives 81." }
    ]
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let timerInterval = null;
const TIME_LIMIT = 20; // 20 seconds for each question
let incorrectAnswers = [];

const homeScreen = document.getElementById('home-screen');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const timerElement = document.getElementById('timer');
const timeSpan = document.getElementById('time');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

document.getElementById('start-general-knowledge').addEventListener('click', () => startQuiz('generalKnowledge'));
document.getElementById('start-math').addEventListener('click', () => startQuiz('math'));
nextButton.addEventListener('click', () => nextQuestion());
restartButton.addEventListener('click', () => restartQuiz());

function startQuiz(quizType) {
    currentQuiz = quizzes[quizType];
    currentQuestionIndex = 0;
    incorrectAnswers = [];
    homeScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultElement.classList.add('hidden');
    timerElement.classList.remove('hidden');
    startQuestion();
}

function startQuestion() {
    if (timerInterval) clearInterval(timerInterval);
    timeSpan.textContent = TIME_LIMIT;
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    questionElement.innerHTML = `<div class="question-container">${question.question}</div>`;
    answersElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => checkAnswer(answer, button));
        answersElement.appendChild(button);
    });
}

function updateTimer() {
    const time = parseInt(timeSpan.textContent, 10);
    if (time <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
    } else {
        timeSpan.textContent = time - 1;
    }
}

function checkAnswer(selectedAnswer, button) {
    const correctAnswer = currentQuiz[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.disabled = true); // Disable all buttons

    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        incorrectAnswers.push({
            question: currentQuiz[currentQuestionIndex].question,
            selected: selectedAnswer,
            correct: correctAnswer
        });
    }
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        startQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerHTML = `Your score: ${currentQuiz.length - incorrectAnswers.length} / ${currentQuiz.length}`;
    if (incorrectAnswers.length > 0) {
        let incorrectHTML = '<h3 class="glow">Incorrect Answers:</h3>';
        incorrectAnswers.forEach(ia => {
            incorrectHTML += `<p class="glow"><strong>Question:</strong> ${ia.question}<br><strong>Your Answer:</strong> ${ia.selected}<br><strong>Correct Answer:</strong> ${ia.correct}</p>`;
        });
        scoreElement.innerHTML += incorrectHTML;
    }
    timerElement.classList.add('hidden');
}

function restartQuiz() {
    resultElement.classList.add('hidden');
    homeScreen.classList.remove('hidden');
}
