class Level15 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level15.json';
    this.nextLevel = 'Level16';
    this.map = 'map15';
    this.playerX = 60;
    this.playerY = 440;
    this.enemyCount = 8;

    Phaser.Scene.call(this, { key: 'Level15' });

    }

    finalBossInfo(){
      let boundHitEnemy = hitEnemy.bind(this);
      finalBoss = this.physics.add.sprite(700, 450, 'finalBoss');
      finalBoss.setGravityY(200);
      finalBoss.setCollideWorldBounds(true);
    }
}
