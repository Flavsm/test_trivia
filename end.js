

const mostRecentScore = localStorage.getItem('mostRecentScore');
const restart = document.getElementById('restart');

const totalScore = document.getElementById( 'totalScore');

totalScore.innerText = `Total Score: ${mostRecentScore}`;

restart.addEventListener('click', playNewGame = () => {
    return window.location.assign("index.html");
});

//get the box element
const final = document.getElementById('final');
//create a new element
const finalMessage = document.createElement('h1');
//add text to the new element
finalMessage.innerText = 'Congratulations!';
//insert the new element to the box element
final.insertAdjacentElement('afterbegin', finalMessage);


mostRecentScore === '100' ? finalMessage.innerText = 'Congratulations!' 
: mostRecentScore >= '70' ? finalMessage.innerText = 'Good Job!' 
: mostRecentScore >= '40' ? finalMessage.innerText = 'Not bad!'
: mostRecentScore >= '10' ? finalMessage.innerText = 'Try again!'
: finalMessage.innerText = 'Oof!';

