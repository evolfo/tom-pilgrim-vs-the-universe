class Level6 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level6.json';
    this.nextLevel = 'Level7';
    this.map = 'map6';
    this.playerX = 60;
    this.playerY = 540;

    Phaser.Scene.call(this, { key: 'Level6' });


  }
}
