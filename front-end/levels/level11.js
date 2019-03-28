class Level11 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level11.json';
    this.nextLevel = 'Level12';
    this.map = 'map11';
    this.playerX = 60;
    this.playerY = 440;
    this.enemyCount = 4;

    Phaser.Scene.call(this, { key: 'Level11' });

    }
}
