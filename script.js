var currentQuestion= 0;
var timeLeft= 60;
var timerInterval;
var questions= [
    {question:"Who founded Microsoft?",answers:['Elon Musk','Bill Gates','Steve Jobs'], correctAnswer:'Bill Gates'},
    {question:"Who owns Tesla Motors?", answers:['Henry Ford','Elon Musk','Akio Toyoda'], correctAnswer:'Elon Musk'},
    {question:"What is 10 + 20 ?", answers:['25','30','40'], correctAnswer:'30'},
    {question:"Who is the CEO of Facebook?", answers:['Kanye West','Mark Zuckerberg','Jeff Bezos'], correctAnswer:'Mark Zuckerberg'},
    {question:"Who founded Amazon?", answers:['Bill Gates','Jeff Bezos','General Motors'], correctAnswer:'Jeff Bezos'},
    {question:"Who founded Apple?", answers:['J Balvin','Steve Jobs','Bad Bunny'], correctAnswer:'Steve Jobs'},
]
var newScore = 0
var highscores= []

function startQuiz() {
    document.querySelector("#start-screen").style.display = "none";
    document.querySelector("#start").style.display ="block";
    startTimer();
    showQuestion();   
       
}

function startTimer(){
    timerInterval = setInterval(function(){
        timeLeft--;
        document.querySelector("#timer").textContent= timeLeft;
        if(timeLeft <= 0) {
            endOfQuiz();
        }
    }
    , 1000);
}

function  clickAnswer (answer, question) {
    if (answer == question.correctAnswer ) {
        currentQuestion++;
        if (currentQuestion == questions.length) {
            endOfQuiz(); 
        } else{
            showQuestion();
        }
    } else{
        timeLeft = timeLeft -10;
        if (timeLeft < 0) {
            timeLeft=0;
        }
        showQuestion();
    }
}
function showQuestion() {
    var question = questions[currentQuestion];
    document.querySelector("#question").textContent = question.question;
    var answerElement = document.querySelector("#answers");
    answerElement.innerHTML = "";

    for (var i =0; i < question.answers.length; i++){
    var answer = question.answers[i];
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", clickAnswer.bind(this, answer, question));
    answerElement.appendChild(button);
    }
}

function endOfQuiz() {
    clearInterval(timerInterval);
    document.querySelector("#quiz").style.display = "none";
    document.querySelector("#endOfQuiz").style.display = "block";
    document.querySelector("#score").textContent=timeLeft;
    newScore=timeLeft
    //save high score
    highscores.push(newScore);
    localStorage.setItem("highscores",JSON.stringify(highscores));
}


document.querySelector("#start").addEventListener("click", startQuiz);

