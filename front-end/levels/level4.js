class Level4 extends Level {
 constructor(config){
   super(config)
   this.mapSrc = "level4.json";
   this.nextLevel = "Level5";
   this.map = "map4";
   this.playerX = 20;
   this.playerY = 240;

   Phaser.Scene.call(this, { key: "Level4" });

 }
}
