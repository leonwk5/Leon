const newLocal = false;
const questions = [
    {
        question: "Was ist das groesste Land der Welt?",
        answers: [
            {text: "China", correct: false},
            {text: "Japan", correct: false},
            {text: "Russland", correct: true},
            {text: "USA", correct: false},
        ]
    },
    {
        question: "Welcher Berg ist der hoechste Berg der Welt?",
        answers: [
            {text: "Mount Everest", correct: true},
            {text: "Zugspitze", correct: false},
            {text: "Matterhorn", correct: false},
            {text: "Mont Blanc", correct: false},
        ]  
    },
    {
        question: "Wie viele Bundeslaender hat Deutschland?",
        answers: [
            {text: "16", correct: true},
            {text: "19", correct: false},
            {text: "17", correct: false},
            {text: "18", correct: false},
        ]   
    },
    {
        question: "Wie hoch ist der Eiffelturm?",
        answers: [
            {text: "150m", correct: false},
            {text: "176m", correct: false},
            {text: "220m", correct: false},
            {text: "300m", correct: true},
        ] 
    },
    {
        question: "Wie viele Kontinente gibt es auf der Erde?",
        answers: [
            {text: "7", correct: true},
            {text: "8", correct: false},
            {text: "6", correct: false},
            {text: "9", correct: false},
        ] 
    },
    {
        question: "Was ist das kleinste Land der Welt?",
        answers: [
            {text: "San Marino", correct: false},
            {text: "Nauru", correct: false},
            {text: "Vatikanstadt", correct: true},
            {text: "Monaco", correct: false},
        ] 
    },
    {
        question: "Wie viele Planeten gibt es in unsere Sonnensystem?",
        answers: [
            {text: "9", correct: false},
            {text: "7", correct: false},
            {text: "8", correct: true},
            {text: "10", correct: false},
        ] 
    },
    {
        question: "Wie faengt das pi an?",
        answers: [
            {text: "1,34", correct: false},
            {text: "1,43", correct: false},
            {text: "4.31", correct: false},
            {text: "3,14", correct: true},
        ] 
    },
    {
        question: "Wie viele Sprachen gibt es?",
        answers: [
            {text: "ca. 13.000", correct: false},
            {text: "ca. 7.000", correct: true},
            {text: "573", correct: false},
            {text: "249", correct: false},
        ] 
    },
    {
        question: "Wie viele Mitglieder hat die Nato?",
        answers: [
            {text: "13", correct: false},
            {text: "17", correct: false},
            {text: "53", correct: false},
            {text: "30", correct: true},
        ] 
    },
    {
        question: "Wie viele Menschen leben auf der Erde?",
        answers: [
            {text: "ca. 9 Milliarden", correct: false},
            {text: " 7,888 Milarden", correct: false},
            {text: "ca. 8 Milliarden", correct: true},
            {text: "800 Millionen", correct: false},
        ] 
    },
    {
        question: "Wer war der erste Mensch auf dem Mond?",
        answers: [
            {text: "Eugene Cernan", correct: false},
            {text: "Juri Gagarin", correct: false},
            {text: "Neil Amstrong", correct: true},
            {text: "Niemand", correct: false},
        ] 
    },
    {
        question: "Wie groß ist der groeßte Mensch der Welt?",
        answers: [
            {text: "2.47m", correct: false},
            {text: "2.52m", correct: false},
            {text: "2.23m", correct: false},
            {text: "2.36m", correct: true},
        ] 
    },
    {
        question: "Wer ist unser Budeskanzler/in?",
        answers: [
            {text: "Joe Biden", correct: false},
            {text: "Olaf Scholz", correct: true},
            {text: "Barack Obama", correct: false},
            {text: "Angela Merkel", correct: false},
        ] 
    },
    {
        question: "In welchem Land steht der Schiefe Turm von Pisa?",
        answers: [
            {text: "Pisa", correct: false},
            {text: "Palästina", correct: false},
            {text: "Italien", correct: true},
            {text: "Frankreich", correct: false},
        ] 
    },
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Du hast ${score} von ${questions.
    length} Punkte. Glückwunsch!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();