
let player, enemies, boss1, boss2, finalBoss, hearts;
let platforms;
let cursors;
let score = 0;
let fireball;
let isHit = false;
let fireballs;
let playerHealth = 3;
let bossHealth;
let speed;
let angle = "left";
let gameOver = false;
let victory = false;
let hitEnemyIsRunning = false;
let currentGame;
let isGameActive = false;


let spaceBar;
let left;
let right;

const mainBackground = document.querySelector('#main-background');
const playButton = document.querySelector('.play-button');
const scoreDIV = document.querySelector('.scoreboard');
const health = document.querySelector('.health');
const scoreDisplay = document.querySelector('.score');
const submitButton = document.querySelector('#submit-button');
const userScoresUL = document.querySelector('#user-scores');
const userInputDIV = document.querySelector('#user-input');
const endGameDIV = document.querySelector('#end-game');
const playButton2 = endGameDIV.querySelector('.play-button');
const victoryDIV = document.querySelector('#victory');
const playButton3 = victoryDIV.querySelector('.play-button');
const changePlayerVictory = victoryDIV.querySelector('.change-player');
const changePlayerDefeat = endGameDIV.querySelector('.change-player');


const app = new App;

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    pixelArt: true,
    scene: [ Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11, Level12, Level13, Level14, Level15 ]
};

// New Game Config

function gameConfig() {
  gameOver = false;
  victory = false;
  score = 0;
  new Phaser.Game(config);
  document.querySelector('canvas').className = "col-md-6 offset-md-1";
}

document.addEventListener('DOMContentLoaded', () => {
  loadScores();
});

let scoreLoadSequence = 0;

async function loadScores() {
  const sequence = ++scoreLoadSequence;
  const note = document.querySelector('.score-storage-note');
  if (note) {
    note.textContent = window.GAME_API_BASE_URL
      ? 'Scores are shared online when available and cached in this browser.'
      : 'Scores are saved in this browser only.';
  }

  const games = await app.gameAdapter.getAllGames();
  if (sequence !== scoreLoadSequence || isGameActive) {
    return;
  }

  Game.all = [];
  games.forEach(game => new Game(game));
  Game.generateScoreHTML(userScoresUL);
}

window.addEventListener('scores:updated', loadScores);

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const username = event.target.username.value.trim();
  if (!username) {
    return;
  }

  User.all = [];
  new User(app.userAdapter.createUser(username));
  userInputDIV.style.display = "none";
  mainBackground.style.display = "flex";
});


function gameOverScreen() {

  isGameActive = false;
  health.style.display = "none";
  scoreDisplay.style.display = "none";
  endGameDIV.style.display = "flex";
  playerHealth = 3;
  gameOver = false;

  victory = false;

  if (!currentGame) {
    return;
  }

  const gameObj = app.gameAdapter.updateGame(currentGame.id, score, victory);
  if (gameObj) {
    currentGame.score = gameObj.score;
    Game.generateScoreHTML(userScoresUL);
  }
}

function gameVictory() {
  isGameActive = false;
  playerHealth = 3;
  gameOver = false;
  victoryDIV.style.display = "flex";
  score += 100;
  scoreDisplay.innerText = `Score: ${score}`;
  victory = true;

  if (!currentGame) {
    return;
  }

  const gameObj = app.gameAdapter.updateGame(currentGame.id, score, victory);
  if (gameObj) {
    currentGame.score = gameObj.score;
    Game.generateScoreHTML(userScoresUL);
  }

    score = 0;
    victory = false;
}


// LISTENERS

function startGame() {
  const user = User.all[User.all.length -1];
  if (!user) {
    mainBackground.style.display = "none";
    userInputDIV.style.display = "flex";
    return;
  }

  mainBackground.style.display = "none";
  userInputDIV.style.display = "none";
  scoreDIV.style.display = "block";
  scoreDisplay.style.display = "block";
  endGameDIV.style.display = "none";
  victoryDIV.style.display = "none";

  currentGame = new Game(app.gameAdapter.createGame(user.id));
  isGameActive = true;
  gameConfig();
}

playButton.addEventListener('click', startGame);

playButton2.addEventListener('click', startGame);

playButton3.addEventListener('click', startGame);

changePlayerVictory.addEventListener('click', event => {
    victoryDIV.style.display = "none";
      mainBackground.style.display = "none";
      userInputDIV.style.display = "flex";
    User.all = [];
    currentGame = null;
    isGameActive = false;
    loadScores();

});

changePlayerDefeat.addEventListener('click', event => {
  endGameDIV.style.display = "none";
  userInputDIV.style.display = "flex";
  User.all = [];
  currentGame = null;
  isGameActive = false;
  loadScores();

});
