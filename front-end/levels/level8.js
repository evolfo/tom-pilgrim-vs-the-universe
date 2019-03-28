class Level8 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level8.json';
    this.nextLevel = 'Level9';
    this.map = 'map8';
    this.playerX = 60;
    this.playerY = 240;

    Phaser.Scene.call(this, { key: 'Level8' });


  }
}
