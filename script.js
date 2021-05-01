const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const elem = document.querySelectorAll('.btn');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
let answers = [];

let targetValue;

fetchQuestions = (link) => {
    fetch(link)
.then(res => {
    if (!res.ok) {
    throw new Error('problem with the api');
}
    return res.json() 
})  
.then(data => {
    questions = data.results.map(loadedQuestions => {
        const formattedQuestion = {
            question: loadedQuestions.question
        };
        
        const answerChoices = [...loadedQuestions["incorrect_answers"]];
    
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestions["correct_answer"]);

        questions.push(formattedQuestion.question);
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
            return questions
        })
        return formattedQuestion;
    })
    startGame();
})
.catch(err => console.log(err.message));
};

elem.forEach(e => e.addEventListener('mousedown', (e) => { 
    targetValue = e.target.dataset.value;
    localStorage.setItem('datanumber', targetValue);
    window.location.assign('game.html');
}));

chosenCategory = (category) => {
    return `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
}

const mostRecentDataValue = localStorage.getItem('datanumber');

mostRecentDataValue === "9" ? fetchQuestions(chosenCategory('9')) :
mostRecentDataValue === '23' ? fetchQuestions(chosenCategory('23')) :
mostRecentDataValue === '21' ? fetchQuestions(chosenCategory('21')) :
mostRecentDataValue === '22' ? fetchQuestions(chosenCategory('22')) :
mostRecentDataValue === '20' ? fetchQuestions(chosenCategory('20')) :
mostRecentDataValue === '12' ? fetchQuestions(chosenCategory('12')) :
mostRecentDataValue === '10' ? fetchQuestions(chosenCategory('17')) :
mostRecentDataValue === '24' ? fetchQuestions(chosenCategory('24')) :
mostRecentDataValue === '27' ? fetchQuestions(chosenCategory('27')) :
fetchQuestions('https://opentdb.com/api.php?amount=10&type=multiple');

const CORRECT_POINTS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= questions.length) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${questions.length}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
       if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const applyClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (applyClass === 'correct') {
            incrementScore(CORRECT_POINTS)
        }

        selectedChoice.parentElement.classList.add(applyClass);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(applyClass);
            getNewQuestion();
        }, 1100);

    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}


