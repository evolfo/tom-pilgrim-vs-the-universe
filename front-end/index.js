
let player;
let platforms;
let cursors;
let score = 0;
let spaceBar;
let fireball;
let isHit = false;
let fireballs;
let playerHealth = 3;
let bossHealth;
let speed;
let angle = "left";
let gameOver = false;



const mainBackground = document.querySelector('#main-background');
const playButton = document.querySelector('#play-button');
const health = document.querySelector('.health');
const scoreDisplay = document.querySelector('.score');
const submitButton = document.querySelector('#submit-button');
const userScoresUL = document.querySelector('#user-scores');
const userInputDIV = document.querySelector('#user-input');

document.addEventListener('DOMContentLoaded', () => {
  const app = new App;

  submitButton.addEventListener('click', event => {
    event.preventDefault();
    mainBackground.style.display = "flex";

    let username = event.target.parentElement.username.value;

    app.userAdapter.createUser(username);

    app.gameAdapter.getAllGames()
     .then(allGames => {
      allGames.forEach(game => {
        newGame = new Game(game);
          userScoresUL.innerHTML += newGame.generateScoreHTML();
        })
      })
    });

})

playButton.addEventListener('click', event => {
  mainBackground.style.display = "none";
  playButton.style.display = "none";
  userInputDIV.style.display = "none";
  health.style.display = "block";
  scoreDisplay.style.display = "block";

  var config = {
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
      scene: [ Level1, Level2, Level3, Level4, Level5 ]
  };

  let game = new Phaser.Game(config);

  //Level1, Level2, Level3, Level4,
})
