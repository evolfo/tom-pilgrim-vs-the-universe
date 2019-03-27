class Level3 extends Level {
  constructor(){
    super(config)
    this.mapSrc = 'level3.json';
    this.nextLevel = 'Level4';
    this.map = 'map3';
    this.playerX = 20;
    this.playerY = 480;

    Phaser.Scene.call(this, { key: 'Level3' });

  }
}
