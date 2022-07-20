//---QUIZ GAME--//

// Global Variables //
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resetButton = document.getElementById('reset-btn');
const saveButton = document.getElementById('save-btn');
const questContain = document.getElementById('question-container');
const choiceContain = document.getElementById('choices-container');
const questionEl = document.getElementById('question');
const questionNumEl = document.getElementById('question-num');
const answerBtnEl = document.getElementById('ans-btn');
const timerEl = document.getElementById('timer');
const navBarEl = document.getElementById('navbar');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const formEl = document.getElementById('form');
const finalscoreMsgEl = document.getElementById('finalscore-msg');
const usernameEl = document.getElementById('username');
const highScoreEl = document.getElementById('highScore');




//Score Variable
var score = 0;

//Set Interval Object

var intervalObj;

//Timer Function Variables

const totalTime = 10;
let time = totalTime * 60;

//Establish Question Arrays and Shuffling

let shuffleQuestions, currentQuestionIndex;

//High Score Array
const highscoreArr = JSON.parse(localStorage.getItem('highScores')) || [];

//Allow for clicking the start button to start the game and next button to progress

startButton.addEventListener("click",startGame);
resetButton.addEventListener('click', resetAll);
saveButton.addEventListener('click', scoreCollect);


//Question and Answer Array
const questions = [

    {
        question: 'Javascript is an _________ language?',
        answers: [
            {text: 'Object-Oriented' , correct: 1},
            {text: 'Object-Based' , correct: 0},
            {text: 'Procedural' , correct: 0},
            {text: 'None of the above' , correct: 0}
        ]
    },

    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: [
            {text: 'var' , correct: 1},
            {text: 'project' , correct: 0},
            {text: 'item' , correct: 0},
            {text: 'function' , correct: 0}
        ]
    },


    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: [
            {text: 'getElementbyId()' , correct: 0},
            {text: 'getElementsByClassName()' , correct: 0},
            {text: 'Both A and B' , correct: 1},
            {text: 'None of the above' , correct: 0}
        ]
    },

    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        answers: [
            {text: 'document.write()' , correct: 0},
            {text: 'console.log()' , correct: 0},
            {text: 'window.alert()' , correct: 0},
            {text: 'All of the above' , correct: 1}
        ]
    },

    {
        question: 'How can a datatype be declared to be a constant type?',
        answers: [
            {text: 'const' , correct: 1},
            {text: 'var' , correct: 0},
            {text: 'let' , correct: 0},
            {text: 'constant' , correct: 0}
        ]
    },


]


//Functions for the game

function startGame(){
    console.log("Game has started");
    startButton.classList.add('hide');
    resetButton.classList.remove('hide');
    timerEl.classList.remove('hide');
    scoreEl.classList.remove('hide');
    questContain.classList.remove('hide');
    choiceContain.classList.remove('hide');
    highScoreEl.classList.add('hide');
    shuffleQuestions = questions.sort(function(a, b){return 0.5 - Math.random()});
    //console.log(shuffleQuestions)
    

    currentQuestionIndex = 0;
    intervalObj = setInterval(timerRun,1000);
    nextQuestion();


}


function nextQuestion(){
    resetQuestionBtns();
    
    displayQuestion(shuffleQuestions[currentQuestionIndex]);
    currentQuestionIndex++;

    if(currentQuestionIndex >= shuffleQuestions.length){
       
        scoreDisplay();
    }


}


function scoreDisplay(){
    //Need to display score and form to type in name
    //Need to show previous scores as well
    nextButton.classList.add('hide');
    feedbackEl.classList.add('hide');
    timerEl.classList.add('hide');
    questContain.classList.add('hide');
    choiceContain.classList.add('hide');
    resetButton.classList.add('hide');
    formEl.classList.remove('hide');
    scoreEl.classList.add('scoreboard');

    scoreEl.innerText = "Final Score: " + score;


    finalscoreMsgEl.innerText = "Your Final Score is: " + score;
    

}

function scoreCollect(){
    event.preventDefault();
    const recentScore ={
        score: score,
        initials: usernameEl.value
    };

    highscoreArr.push(recentScore);

    highscoreArr.sort((a,b) => b.score - a.score);
    highscoreArr.splice(5);


    

    localStorage.setItem("highScores", JSON.stringify(highscoreArr));

    console.log(highscoreArr);

    formEl.classList.add('hide');

    resetAll();

    displayHighScore();

    startButton.classList.remove("hide");
    startButton.innerText = "Play Again"


};

function displayHighScore(){

    highScoreEl.classList.remove("hide");
    highScoreEl.innerText = "Top 5 Scores: ";
    const highscoreText = JSON.stringify(highscoreArr);

    console.log("Score Array Text : " + highscoreText);

    const highscoreObj = JSON.parse(highscoreText);

    console.log(highscoreObj);

    highscoreObj.forEach(score => {
        const scoreLine = document.createElement("p");
        const scoreText = document.createTextNode("Test");
        scoreLine.appendChild(scoreText);
        highScoreEl.appendChild(scoreLine);

        scoreLine.innerText = "Score: " + score.score + "," + score.initials;
    });

   


    

      
    //highscoreArr.forEach(score => {
   //     const scoreLine = document.createElement("p");
     //   const scoreText = document.createTextNode("Test");
      //  scoreLine.appendChild(scoreText);
       // navBarEl.appendChild(scoreLine);
       // scoreLine.innerText = JSON.stringify(score);
     //   console.log("For Each Loop something exists");
   // });





}

function selectAnswer(e){
    //console.log("answer has been selected")
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    //console.log ("answer value is: " + correct);
    checkAnswer(correct);

}

function checkAnswer(number){
    //console.log("The value being passed is : " + number);
    var statementAns = number;
    //console.log("Value of " + statementAns + " has now been passed statementAns")
    if (statementAns > 0){
        feedbackEl.classList.remove('hide');
        feedbackEl.innerText = 'Correct, click next to continue';
        //nextButton.classList.remove("hide");
        score = score + 5;
        scoreEl.innerText = "Score: " + score;
    }
    else{
        feedbackEl.classList.remove('hide');
        feedbackEl.innerText = 'Incorrect, try again';
        time = time - 10;
        score = score - 1;
        scoreEl.innerText = "Score: " + score;
    }
    nextQuestion();

}


function displayQuestion(questions){
    questionEl.innerText = questions.question
    questionNumEl.innerText = "Question #" + (currentQuestionIndex + 1);
    questions.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('ans-btn');
        //console.log('answer button created');
        button.dataset.correct = answers.correct
        //console.log('data for button for ' + button + ' equals ' +button.dataset.correct);
        button.addEventListener('click' , selectAnswer);
        choiceContain.appendChild(button);
        //console.log('answer button created');
    });
}

function resetQuestionBtns(){
    
    while(choiceContain.firstChild){
    choiceContain.removeChild(choiceContain.firstChild);
    nextButton.classList.add('hide');
    feedbackEl.classList.add('hide');
    //console.log("child removed");
    }

}

function resetAll(){

    clearInterval(intervalObj);
    time = totalTime * 60;
    score = 0;
    scoreEl.innerText = "Score: " + score;

    while(choiceContain.firstChild){
        choiceContain.removeChild(choiceContain.firstChild);
    }

    nextButton.classList.add('hide');
    feedbackEl.classList.add('hide');
    startButton.classList.remove('hide');
    timerEl.classList.add('hide');
    scoreEl.classList.add('hide');
    questContain.classList.add('hide');
    choiceContain.classList.add('hide');
    resetButton.classList.add('hide');
    
   


}

function playAgain(){

    


    resetAll();
    scoreEl.classList.remove('scoreboard');
    formEl.classList.add('hide');
    navBarEl.removeChild(scoreLine);

}


function timerRun(){
    
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerEl.innerText = "Timer | " + minutes + ":" + seconds;
    time--;

    if(timer = 0){
        //game is over
        clearInterval(intervalObj);
        resetAll();

    }

}



