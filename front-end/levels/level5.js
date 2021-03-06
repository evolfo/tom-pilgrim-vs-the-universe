class Level5 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level5.json';
    this.nextLevel = 'Level6';
    this.map = 'map5';
    this.playerX = 60;
    this.playerY = 540;
    this.enemyCount = 4;

    Phaser.Scene.call(this, { key: 'Level5' });


  }

  bossInfo(){
    boss1 = this.physics.add.sprite(700, 450, 'boss1');
    boss1.setGravityY(100);
    boss1.setCollideWorldBounds(true);
    this.physics.moveToObject(boss1, player, 100);
    this.physics.add.collider(boss1, this.Walls);
  }

}
