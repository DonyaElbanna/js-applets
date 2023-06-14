/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var newBtn = document.querySelector(".btn-new");
var rollBtn = document.querySelector(".btn-roll");
var holdBtn = document.querySelector(".btn-hold");
var score0 = document.querySelector("#score-0");
var score1 = document.querySelector("#score-1");
var current0 = document.querySelector("#current-0");
var current1 = document.querySelector("#current-1");
var player1Panel = document.querySelector(".player-0-panel");
var player2Panel = document.querySelector(".player-1-panel");
var diceImg = document.querySelector("img");

var diceImgs = [
  "./images/dice-1.png",
  "./images/dice-2.png",
  "./images/dice-3.png",
  "./images/dice-4.png",
  "./images/dice-5.png",
  "./images/dice-6.png",
];

var player1Score = 0;
var player2Score = 0;
var player1Current = 0;
var player2Current = 0;

score0.innerText = player1Score;
score1.innerText = player2Score;
current0.innerText = player1Current;
current1.innerText = player2Current;

var player1Active = true;
var player2Active = false;

function newGame() {
  var player1Score = 0;
  var player2Score = 0;
}
function rollDice() {
  var randomNum = Math.floor(Math.random() * 6 + 1);
  diceImg.src = diceImgs[randomNum - 1];
  var diceScoreImg = diceImg.src.split("/")[10];
  current0.innerText = 0;
  current1.innerText = 0;

  if (diceScoreImg.includes("1")) {
    if (player1Active) {
      player1Current = 0;
      current0.innerText = player1Current;
    } else {
      player2Current = 0;
      current1.innerText = player2Current;
    }
  } else if (diceScoreImg.includes("2")) {
    if (player1Active) {
      player1Current += 2;
      current0.innerText = player1Current;
    } else {
      player2Current += 2;
      current1.innerText = player2Current;
    }
  } else if (diceScoreImg.includes("3")) {
    if (player1Active) {
      player1Current += 3;
      current0.innerText = player1Current;
    } else {
      player2Current += 3;
      current1.innerText = player2Current;
    }
  } else if (diceScoreImg.includes("4")) {
    if (player1Active) {
      player1Current += 4;
      current0.innerText = player1Current;
    } else {
      player2Current += 4;
      current1.innerText = player2Current;
    }
  } else if (diceScoreImg.includes("5")) {
    if (player1Active) {
      player1Current += 5;
      current0.innerText = player1Current;
    } else {
      player2Current += 5;
      current1.innerText = player2Current;
    }
  } else if (diceScoreImg.includes("6")) {
    if (player1Active) {
      player1Current += 6;
      current0.innerText = player1Current;
    } else {
      player2Current += 6;
      current1.innerText = player2Current;
    }
  }
}
function holdScore() {
  player1Panel.classList.toggle("active");
  player2Panel.classList.toggle("active");
  player1Active = !player1Active;
  player2Active = !player2Active;
  if (!player1Active) {
    score0.innerText = current0.innerText;
    current0.innerText = 0;
  } else {
    score1.innerText = current1.innerText;
    current1.innerText = 0;
  }
  player1Score += player1Current;
  player2Score += player2Current;
  score0.innerText = player1Score;
  score1.innerText = player2Score;
  player1Current = 0;
  player2Current = 0;
  if (score0.innerText >= 30) {
    player1Panel.classList.add("winner");
    document.querySelectorAll(".player-name")[0].innerText = "WINNER";
  } else if (score1.innerText >= 100) {
    player2Panel.classList.add("winner");
    document.querySelectorAll(".player-name")[1].innerText = "WINNER";
  }
}
newBtn.addEventListener("click", newGame);
rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
