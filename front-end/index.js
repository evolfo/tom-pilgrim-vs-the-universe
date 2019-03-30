
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
  let game = new Phaser.Game(config);
  document.querySelector('canvas').className = "col-md-6 offset-md-1";
}

document.addEventListener('DOMContentLoaded', () => {

  app.gameAdapter.getAllGames()
   .then(allGames => {
     allGames.forEach(game => new Game(game))
       Game.generateScoreHTML(userScoresUL);
  })

})

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  userInputDIV.style.display = "none";
  mainBackground.style.display = "flex";
  let username = event.target.username.value;
    debugger
    console.log(username);
// Creating User
  app.userAdapter.createUser(username)
    .then(userObj => {
      new User(userObj);
    })
  });


function gameOverScreen() {

  health.style.display = "none";
  scoreDisplay.style.display = "none";
  endGameDIV.style.display = "flex";
  playerHealth = 3;
  gameOver = false;

  game = Game.all[Game.all.length -1];
  victory = false;

  app.gameAdapter.updateGame(game.id, score, victory)
    .then(gameObj => {
      game.score = gameObj.score;
      Game.generateScoreHTML(userScoresUL);
    })
}

function gameVictory() {
  playerHealth = 3;
  gameOver = false;
  victoryDIV.style.display = "flex";
  score += 100;
  scoreDisplay.innerText = `Score: ${score}`;
  victory = true;

  game = Game.all[Game.all.length -1];

  app.gameAdapter.updateGame(game.id, score, victory)
    .then(gameObj => {
      game.score = gameObj.score;
      Game.generateScoreHTML(userScoresUL);
    })

    score = 0;
    victory = false;
}


// LISTENERS

playButton.addEventListener('click', event => {
  mainBackground.style.display = "none";
  userInputDIV.style.display = "none";
  scoreDIV.style.display = "block";
  scoreDisplay.style.display = "block";
  endGameDIV.style.display = "none";

  let id = User.all[User.all.length -1].id

// CREATING GAME INSTANCE JAVASCRIPT OO
  app.gameAdapter.createGame(id)
    .then(gameObj => {
      new Game(gameObj);
    })

  gameConfig();
})

playButton2.addEventListener('click', event => {
  scoreDisplay.style.display = "block";
  endGameDIV.style.display = "none";
  scoreDIV.style.display = "block";

  let id = User.all[User.all.length -1].id

// CREATING GAME INSTANCE JAVASCRIPT OO
  app.gameAdapter.createGame(id)
    .then(gameObj => {
      new Game(gameObj);
    })

  gameConfig();
})

playButton3.addEventListener('click', event => {
  scoreDisplay.style.display = "block";
  victoryDIV.style.display = "none";
  scoreDIV.style.display = "block";

  let id = User.all[User.all.length -1].id

// CREATING GAME INSTANCE JAVASCRIPT OO
  app.gameAdapter.createGame(id)
    .then(gameObj => {
      new Game(gameObj);
    })

  gameConfig();
})

changePlayerVictory.addEventListener('click', event => {
    victoryDIV.style.display = "none";
      mainBackground.style.display = "none";
      userInputDIV.style.display = "flex";

    app.gameAdapter.getAllGames()
     .then(allGames => {
       allGames.forEach(game => new Game(game))
         Game.generateScoreHTML(userScoresUL);
    })

});

changePlayerDefeat.addEventListener('click', event => {
  endGameDIV.style.display = "none";
  userInputDIV.style.display = "flex";


});
