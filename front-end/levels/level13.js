class Level13 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level13.json';
    this.nextLevel = 'Level14';
    this.map = 'map13';
    this.playerX = 60;
    this.playerY = 440;
    this.enemyCount = 6;

    Phaser.Scene.call(this, { key: 'Level13' });

    }
}
