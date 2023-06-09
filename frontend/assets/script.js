const questions = [
    {
        question: "Lorem ipsum",
        answers:[
            {text: "dolor", correct: true},
            {text: "sit", correct: false},
            {text: "amet", correct: false},
            {text: "Elephant", correct: false},
            
        ]
    },
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Your Mom", correct: true},
            {text: "Blue Whale", correct: false},
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            
        ]
    },
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Your Mom", correct: true},
            {text: "Blue Whale", correct: false},
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-qbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    console.log("a");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("qbtn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored ${score} ${questions.length}!";
    nextButton.innerHTML = "Play again"; 
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if((currentQuestionIndex < questions.length)){
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();