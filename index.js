let player;
let platforms;
let cursors;
let score = 0;
let spaceBar;
let fireball;
let isHit = false;
let fireballs;
let playerHealth = 3;
let speed;
let angle = "left";
let gameOver = false;

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
    scene: [ Level1, Level2 ]
};

let game = new Phaser.Game(config);
