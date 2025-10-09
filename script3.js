const questions = [
    { question: "Which is the most populous country in the world?", answers: [
        { text: "China", correct: false },
        { text: "USA", correct: false },
        { text: "India", correct: true },
        { text: "Indonesia", correct: false },
    ]},
    { question: "How many countries are there in the world?", answers: [
        { text: "193", correct: false },
        { text: "195", correct: true },
        { text: "196", correct: false },
        { text: "198", correct: false },
    ]},
    { question: "Which country has the most natural lakes?", answers: [
        { text: "United States", correct: false },
        { text: "Canada", correct: true },
        { text: "Finland", correct: false },
        { text: "Russia", correct: false },
    ]},
    { question: "What is the tallest waterfall in the world?", answers: [
        { text: "Niagara Falls", correct: false },
        { text: "Angel Falls", correct: true },
        { text: "Victoria Falls", correct: false },
        { text: "Lguazu Falls", correct: false },
    ]},
{ question: "When was the first world war start?", answers: [
        { text: "1914", correct: true },
        { text: "1918", correct: false },
        { text: "1939", correct: false },
        { text: "1942", correct: false },
    ]},
{ question: "Who wrote the play **Romeo and Juliet**?", answers: [
        { text: "Charles Dickens", correct: false },
        { text: "Jane Austen", correct: false },
        { text: "William Shakespeare", correct: true },
        { text: " Mark Twain", correct: false },
    ]},
{ question: "What is the main component of the air we breathe?", answers: [
        { text: "Nitrogen", correct: true },
        { text: "Oxygen", correct: false },
        { text: "Carbon dioxide", correct: false },
        { text: "Hydrogen", correct: false },
    ]},
{ question: "Which component acts as the **central communication backbone** for all other hardware components in a computer?", answers: [
        { text: "Power Supply Unit (PSU)", correct: false },
        { text: "Motherboard", correct: true },
        { text: "Hard Disk Drive (HDD)", correct: false },
        { text: "CPU", correct: false },
    ]},
{ question: "The process by which plants make their own food is called what?", answers: [
        { text: "Respiration", correct: false },
        { text: "Transpiration", correct: false },
        { text: "Fermentation", correct: false },
        { text: "Photosynthesis", correct: true },
    ]},
{ question: "The currency of the United Kingdom is the...?", answers: [
        { text: "Euro", correct: false },
        { text: "Frenc", correct: false },
        { text: "Pound sterling", correct: true },
        { text: "Dollar", correct: false },
    ]},
{ question: " Which type of computer memory is **volatile** and loses its contents when power is turned off?", answers: [
        { text: "RAM (Random Access Memory)", correct: true },
        { text: "ROM (Read Only Memory)", correct: false },
        { text: "HDD (Hard Disk Drive)", correct: false },
        { text: "SSD (Solid State Drive)", correct: false },
    ]},
{ question: "What protocol is primarily used for **securely transferring web pages** over the internet?", answers: [
        { text: "HTTPS (Hyper Text Transfer Protocol Secure)", correct: true },
        { text: "SMTP (Simple Mail Transfer Protocol)", correct: false },
        { text: "FTP (File Transfer Protocol)", correct: false },
        { text: "HTTP (Hyper Text Transfer Protocol", correct: false },
    ]},
{ question: "Which programming language is often described as the 'language of the web' for **front-end development** (client-side scripting)?", answers: [
        { text: "Java", correct: false },
        { text: "Python", correct: false },
        { text: "C++", correct: false },
        { text: "JavaScript", correct: true },
    ]},
{ question: "In a **mesh network topology**, how is every device connected?", answers: [
        { text: "In a closed loop", correct: false },
        { text: "To a single shared communication line(bus)", correct: false },
        { text: "To a central hub or switch", correct: false },
        { text: "To every other device in the network", correct: true },
    ]},
{ question: "What is the common file extension for a **compressed file archive**?", answers: [
        { text: ".exe", correct: false },
        { text: ".zip", correct: true },
        { text: ".pdf", correct: false },
        { text: ".html", correct: false },
    ]}
];

const questionElement = document.getElementById("question");
const AnswerButton = document.getElementById("answer_buttons");
const NextButton = document.getElementById("next_btn");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const startBtn = document.getElementById("start_btn");
const quizContainer = document.querySelector(".quiz-container");
const welcomeMessage = document.getElementById("welcome-message");
const appContainer = document.querySelector(".app");
const questionCountElement = document.getElementById('question-count');
let current_question_index = 0;
const totalQuestions = questions.length;
let score = 0;
let timeLeft = 15;
let timerInterval;

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    welcomeMessage.style.display = "none";  // Hide welcome message on start
    quizContainer.style.display = "block";
    start_quiz();
});

function start_quiz() {
    current_question_index = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    show_question();
    appContainer.classList.remove("hide-progress");  // Ensure progress bar visible at start
}

function show_question() {
    resetState();
    startTimer();

    let currentQuestion = questions[current_question_index];
    let questionNo = current_question_index + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    document.getElementById("question-count").innerHTML = `Question ${questionNo} of ${questions.length}`;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        AnswerButton.appendChild(button);
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    clearInterval(timerInterval);
    NextButton.style.display = "none";
    timerElement.innerHTML = "Time left: 15s";
    progressBar.style.width = "100%";
    while (AnswerButton.firstChild) AnswerButton.removeChild(AnswerButton.firstChild);
}
function updateQuestionCount() {
  questionCountElement.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
}
updateQuestionCount();

function startTimer() {
    timeLeft = 15;
    const totalTime = 15;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    progressBar.style.width = "100%";

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) timeLeft = 0;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
        progressBar.style.width = (timeLeft / totalTime * 100) + "%";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            Array.from(AnswerButton.children).forEach(btn => btn.disabled = true);
            setTimeout(() => handleNextButton(), 1000);
        }
    }, 1000);
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(AnswerButton.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });

    setTimeout(() => handleNextButton(), 1000);
}

function showScore() {
    resetState();
    timerElement.innerHTML = "";
if(score==questions.length)
{
    questionElement.innerHTML=`🎉 Congratulations!!👏&nbsp;&nbsp you got full score`;
}
else if(score>0){
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
}
else{
     questionElement.innerHTML=`Sorry😔 you are not scored`;
}
    NextButton.innerHTML = "Play Again";
    NextButton.style.display = "block";
    appContainer.classList.add("hide-progress");  // Hide progress bar when showing score
}

function handleNextButton() {
    current_question_index++;
    if (current_question_index < questions.length) show_question();
    else showScore();
}

NextButton.addEventListener("click", () => {
    if (current_question_index < questions.length) handleNextButton();
    else {
        start_quiz();
        welcomeMessage.style.display = "none";  // Keep welcome gone on restart
    }
});
