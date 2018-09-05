// GAME RULES:
// Guess the phrase by selecting a letter on the screen's keyboard
// You get 5 chances.
// Guess the phrase before you run out of turns!
// Guess 5 wrong letters and you lose the game.

/*==================================================
Declaring Variables & array phrases
====================================================*/
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const start = document.querySelector('.btn_reset');
const button = document.getElementsByTagName('BUTTON');
const letters = document.getElementsByClassName('letter');
const resetButton = document.createElement('button');
let missed = 0;
const phrases = [
    'No brainer by Justin Bieber',
    'Bet you wish you had me back by Halestorm',
    'Last hope by Paramore',
    'Get Up by Shinedown'
];

/*==================================================
Generating random phrases
====================================================*/
const getRandomPhraseArray = (arr) => {
  let newArr = arr[Math.floor(Math.random()*arr.length)];
  return newArr.split('');
};

let phraseArray = getRandomPhraseArray(phrases);

const addPhraseToDisplay = (arr) => {
  for (let i=0; i<arr.length; i++) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.textContent = arr[i].toUpperCase();
    if (arr[i] ==' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
  console.log(arr);
};

addPhraseToDisplay(phraseArray);

/*=========================================================================
Event listener to hide the overlay screen when the screen button is clicked
==========================================================================*/

start.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  start.disabled = true;
  checkWin();
});

/*=========================================================================
Functions to start the guessing game
==========================================================================*/

const checkLetter = (button) => {
  let letterFound = null;
  for (let i=0; i<letters.length; i++) {
    if (button.textContent === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add('show');
      letterFound = letters[i].textContent;
    }
  }
  //remove hearts for incorrect guesses
    if (letterFound === null) {
      let li = document.getElementsByClassName('tries');
      const hearts = li[missed].firstElementChild;
      hearts.setAttribute('src', 'images/lostHeart.png');
      missed ++;
      console.log(missed);
    }
};

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON"){
    const button = e.target;
    button.className = 'chosen';
    button.disabled = true;
    let letterFound = checkLetter(button);
  }
  setTimeout(checkWin, 3000);
});

const checkWin = () => {
  const show = document.querySelectorAll('.show');
  if (show.length === letters.length) {
    overlay.className = 'win';
    overlay.style.display = 'initial';
    start.textContent = 'You\'ve won!';
    resetButton.style.color = '#78CF82';
  } else {
    if (missed === 5) {
      overlay.className = 'lose';
      overlay.style.display = 'initial';
      start.textContent = 'Better luck next time!';
      resetButton.style.color = '#D94545';
    }
  }
  reset ();
};

const reset = () => {
  resetButton.className = "play_again";
  resetButton.textContent = 'Play Again';
    if (overlay.style.display === 'initial') {
      overlay.append(resetButton);
    }
};

resetButton.addEventListener ('click', (e) => {
    const playAgain = document.location.href = '';
});
