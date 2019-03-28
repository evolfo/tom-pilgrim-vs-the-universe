class Level9 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level9.json';
    this.nextLevel = 'Level10';
    this.map = 'map9';
    this.playerX = 20;
    this.playerY = 340;
    this.enemyCount = 7;

    Phaser.Scene.call(this, { key: 'Level9' });


  }
}
