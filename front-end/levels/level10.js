class Level10 extends Level {
  constructor(config){
    super(config)
    this.mapSrc = 'level10.json';
    this.nextLevel = 'Level11';
    this.map = 'map10';
    this.playerX = 60;
    this.playerY = 440;

    Phaser.Scene.call(this, { key: 'Level10' });

    }
    boss2Info(){
      let  boundHitEnemy = hitEnemy.bind(this);
      this.physics.add.collider(player, boss2, boundHitEnemy, null, this);
      boss2 = this.physics.add.sprite(700, 450, 'boss2');
      boss2.setGravityY(100);
      boss2.setCollideWorldBounds(true);
      this.physics.moveToObject(boss2, player, 300);
      this.physics.add.collider(boss2, this.Walls);
  }
}
