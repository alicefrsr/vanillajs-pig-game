'use strict';

// MODAL WINDOW
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.modal-btn');
const closeModalBtn = document.querySelector('.close-btn');

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);
document.addEventListener('keydown', pressEsc);

function openModal() {
  modal.classList.remove('hidden');
  closeModalBtn.focus();
}
function closeModal() {
  modal.classList.add('hidden');
  openModalBtn.focus();
}
function clickOutside(e) {
  if (e.target === modal) closeModal();
}
function pressEsc(e) {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) closeModal();
  }
}

// GAME FUNCTIONALITY
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const diceImgEl = document.querySelector('.dice-img');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const gameOverEl = document.querySelector('.game-over');

// starting conditions: variables + init function:
const scores = [0, 0]; //scores[0] for player 1, scores[1] for player 2
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true; // to determine whether the game is being played or not. Disables roll dice and hold score btns when false.

const init = function () {
  // reset VALUES of both players SCORES to 0:
  // scores = [0, 0]; // this doesn't work
  scores[0] = 0;
  scores[1] = 0;
  // reset VALUE of CURRENTSCORE (from roll dice functionality) to 0:
  currentScore = 0;
  // set first player to be Player 1 by default

  console.log('setting activePlayer to 0');
  // reset playing state:
  isPlaying = true;

  // reset DISPLAY of both player SCORES to 0:
  score0El.textContent = 0;
  score1El.textContent = 0;
  // reset DISPLAY of both player CURRENT SCORES to 0:
  current0El.textContent = 0;
  current1El.textContent = 0;

  // reset styles:
  diceEl.classList.add('hidden');
  gameOverEl.classList.add('hidden');

  // remove winner style from activePlayer before resetting activePlayer to 0:
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner'); //removes white bg
  document.getElementById(`winner--${activePlayer}`).textContent = ''; // removes 'winner!'
  // set Player 1 to be the first to play by default
  activePlayer = 0;
  // reset active player styles
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  // reset VALUE of current score of active player to 0:
  currentScore = 0;
  // reset DISPLAY of current score of active player to 0:
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // switch to next player:
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  console.log('switching players');
};

// EVENTLISTENERS:
// ROLL DICE BTN FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. generate a random dice roll:
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(`dice roll: ${dice}`);

    // 2. display the dice:
    diceEl.classList.remove('hidden');

    //2B. make it accessible to SR:
    diceImgEl.src = `dice-${dice}.png`;
    diceImgEl.alt = `Rolling dice: you rolled ${dice}`;
    // console.log(`dice roll: ${diceImgEl.src}`);
    console.log(`alt: ${diceImgEl.alt}`);

    //3. check if dice = 1, if true, switch to next player:
    if (dice !== 1) {
      // dice not 1, add dice to current score:
      currentScore += dice; // instead of currentScore0 += dice

      document.getElementById(`current--${activePlayer}`).textContent = currentScore; // current score of whichever player is currently active (instead of: current0El.textContent = currentScore0;)
    } else {
      switchPlayer();
    }
  }
});

// HOLD SCORE BTN FUNCTIONALITY
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore; // here we change the score value
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; // here we display it

    // 2. reset current score of active player to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // 3. check if player's score is >= 20
    if (scores[activePlayer] >= 100) {
      // GAME IS FINISHED - DISABLE BUTTONS
      console.log(`we have a winner! Player ${activePlayer + 1}`);
      isPlaying = false;

      // display GAME OVER instead of DICE
      diceEl.classList.add('hidden');
      gameOverEl.classList.remove('hidden');

      // display winner style:
      // document.querySelector(`.player--${activePlayer}`).classList.remove('active--player');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.getElementById(`winner--${activePlayer}`).textContent = 'Winner!';
    } else {
      // 4. switch to next player
      switchPlayer();
    }
  }
});

// NEW GAME BTN FUNCTIONALITY
btnNew.addEventListener('click', init);
