class Level1 extends Level {
 constructor(config){
   super(config)
   this.mapSrc = "level1.json";
   this.nextLevel = "Level2";
   this.map = "map1";
   this.playerX = 100;
   this.playerY = 480;
   this.enemyCount = 0;

   Phaser.Scene.call(this, { key: "Level1" });
 }

}
