class Level1 extends Level {
 constructor(config){
   super(config)
   this.mapSrc = "level1.json";
   this.nextLevel = "Level2";
   this.map = "map1";
   this.playerX = 100;
   this.playerY = 480;

   Phaser.Scene.call(this, { key: "Level1" });
 }
 //
 // playerInfo(){
 //       player = this.physics.add.sprite(100, 480, ‘dude’);
 //       player.setBounce(0);
 //       player.setCollideWorldBounds(true);
 //       player.body.setGravityY(950);
 // }


}
