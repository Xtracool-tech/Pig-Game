"use strict";
const diceEl = document.querySelector(".dice");
diceEl.style.display = "none";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const Current0 = document.querySelector("#current--0");
const Current1 = document.querySelector("#current--1");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const Help = document.querySelector(".help");
let btnCloseModal = document.querySelector(".close-modal");
let btnCloseModalabt = document.querySelector(".close-modalabt");
const modal = document.querySelector(".modal");
const modalabt = document.querySelector(".modalabt");
const About = document.querySelector(".about");

let playing;
let currentScore;
let activePlayer;
let score;
const Reset = function () {
  diceEl.style.display = "none";
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");

  document.getElementById("score--0").textContent = "0";
  document.getElementById("score--1").textContent = "0";
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  Current0.textContent = "0";
  Current1.textContent = "0";
};
//////////////Help modal//////////////

Help.addEventListener("click", function () {
  if (modal.classList.contains("hidden")) {
    modal.style.display = "block";
  }
});

let CloseModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", function () {
  if (modal.classList.contains("hidden")) {
    modal.style.display = "none";
  }
});

//////////////////////////////////

//////////about////////////

About.addEventListener("click", function () {
  if (modalabt.classList.contains("hidden")) {
    modalabt.style.display = "block";
  }
});

CloseModal = function () {
  modalabt.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModalabt.addEventListener("click", function () {
  if (modalabt.classList.contains("hidden")) {
    modalabt.style.display = "none";
  }
});

////////////////////////////

Reset();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player1EL.classList.toggle("player--active");
  player0EL.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.style.display = "block";
    diceEl.src = `dice-${dice}.png`;

    //Switching between active players
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current scores to actives player scores
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore;
    //Check if the player scores >= 100

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.style.display = "none";
    }
    //finish game
    //switch to the next player
    else {
      switchPlayer();
    }
  }
});

//Resetting the game

btnNew.addEventListener("click", function () {
  Reset();
});
