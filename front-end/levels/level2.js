class Level2 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level2.json';
    this.nextLevel = 'Level3';
    this.map = 'map2';
    this.playerX = 100;
    this.playerY = 480;
    this.enemyCount = 1;

    Phaser.Scene.call(this, { key: 'Level2' });

  }
}
