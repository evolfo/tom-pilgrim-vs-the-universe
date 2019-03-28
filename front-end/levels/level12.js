class Level12 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level12.json';
    this.nextLevel = 'Level13';
    this.map = 'map12';
    this.playerX = 60;
    this.playerY = 440;
    this.enemyCount = 5;

    Phaser.Scene.call(this, { key: 'Level12' });

    }
}
