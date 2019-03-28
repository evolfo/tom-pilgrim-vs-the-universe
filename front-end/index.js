
let player, enemies, boss1, boss2;
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

let spaceBar;
let left;
let right;

const mainBackground = document.querySelector('#main-background');
const playButton = document.querySelector('.play-button');
const health = document.querySelector('.health');
const scoreDisplay = document.querySelector('.score');
const submitButton = document.querySelector('#submit-button');
const userScoresUL = document.querySelector('#user-scores');
const userInputDIV = document.querySelector('#user-input');
const endGameDIV = document.querySelector('#end-game');
const playButton2 = endGameDIV.querySelector('.play-button');

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
    scene: [ Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10 ]
};


function gameConfig() {
  gameOver = false;
  let game = new Phaser.Game(config);
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App;

  submitButton.addEventListener('click', event => {
    event.preventDefault();
    mainBackground.style.display = "flex";

    let username = event.target.parentElement.username.value;

// Creating User
    app.userAdapter.createUser(username)
      .then(userObj => {
        new User(userObj);
      })

    app.gameAdapter.getAllGames()
     .then(allGames => {
      allGames.forEach(game => {
        newGame = new Game(game);
          userScoresUL.innerHTML += newGame.generateScoreHTML();
        })
      })
    });

})

function gameOverScreen() {
  health.style.display = "none";
  scoreDisplay.style.display = "none";
  endGameDIV.style.display = "flex";
  playerHealth = 3;
  gameOver = false;
}

playButton.addEventListener('click', event => {
  const app = new App;

  mainBackground.style.display = "none";
  userInputDIV.style.display = "none";
  health.style.display = "block";
  scoreDisplay.style.display = "block";
  endGameDIV.style.display = "none";

  let id = User.current.id;
  debugger
  app.gameAdapter.createGame(id);

  gameConfig();
})

playButton2.addEventListener('click', event => {
  health.style.display = "block";
  scoreDisplay.style.display = "block";
  endGameDIV.style.display = "none";
  gameConfig();
})
