class Level14 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level14.json';
    this.nextLevel = 'Level15';
    this.map = 'map14';
    this.playerX = 60;
    this.playerY = 440;
    this.enemyCount = 7;

    Phaser.Scene.call(this, { key: 'Level14' });

    }
}
