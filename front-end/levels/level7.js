class Level7 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level7.json';
    this.nextLevel = 'Level8';
    this.map = 'map7';
    this.playerX = 60;
    this.playerY = 540;
    this.enemyCount = 4;

    Phaser.Scene.call(this, { key: 'Level7' });


  }
}
