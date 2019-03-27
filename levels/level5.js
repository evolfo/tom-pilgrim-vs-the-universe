class Level5 extends Level {
  constructor(){
    super(config)
    this.mapSrc = 'level5.json';
    this.nextLevel = 'Level6';
    this.map = 'map5';
    this.playerX = 60;
    this.playerY = 540;

    Phaser.Scene.call(this, { key: 'Level5' });


  }

  bossInfo(){
    let  boundHitEnemy = hitEnemy.bind(this);
    this.physics.add.collider(player, boss1, boundHitEnemy, null, this);
    boss1 = this.physics.add.sprite(700, 450, 'boss1');
    boss1.setGravityY(100);
    boss1.setCollideWorldBounds(true);
    this.physics.moveToObject(boss1, player, 100);
    this.physics.add.collider(boss1, this.Walls);
  }

}


// const Level5 = new Phaser.Class({
//
//   Extends: Phaser.Scene,
//
//   initialize:
//     function Level5 (){
//     Phaser.Scene.call(this, { key: 'Level5' });
//   },
//
//
//     preload: function ()
//     {
//       // this.load.image('sky', 'assets/sky.png');
//       // this.load.image('ground', 'assets/platform.png');
//       this.load.tilemapTiledJSON('map5', "assets/json/level5.json");
//       this.load.image('background', "assets/json/tiles1.png");
//       this.load.image('misc', "assets/json/zelda-tiles.png");
//       this.load.image('walls', "assets/json/space-tiles2.png");
//       this.load.image('bullet', 'assets/bomb.png');
//       this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
//       this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
//       this.load.spritesheet('boss1', 'assets/boss1.png', { frameWidth: 55, frameHeight: 80 });
//       bossHealth = 10;
//     },
//
//     create: function ()
//     {
//       const map = this.make.tilemap({ key: 'map5' });
//       const background = map.addTilesetImage('tiles1', 'background');
//       const misc = map.addTilesetImage('misc', 'misc');
//       const walls = map.addTilesetImage('walls', 'walls');
//       const Background = map.createStaticLayer(0, background, 0, 0);
//       const Misc = map.createStaticLayer(0, misc, 0, 0);
//       const Walls = map.createStaticLayer("Walls", walls, 0, 0);
//       // this.add.image(0, 0, 'sky').setOrigin(0, 0);
//
//       spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
//
//       platforms = this.physics.add.staticGroup();
//
//       player = this.physics.add.sprite(20, 150, 'dude');
//       boss1 = this.physics.add.sprite(700, 450, 'boss1');
//
//       boss1.setGravityY(100);
//       boss1.setCollideWorldBounds(true);
//
//       enemies = this.physics.add.group({
//          key: 'evilDude'
//        });
//
//
//       let boundHitEnemy = hitEnemy.bind(this);
//
//        enemies.children.iterate( (child) => {
//           this.physics.add.collider(player, child, boundHitEnemy, null, this);
//           this.physics.add.collider(enemies, child );
//         });
//
//
//       this.physics.add.collider(player, boss1, boundHitEnemy, null, this);
//
//       player.setBounce(0);
//       player.setCollideWorldBounds(true);
//       player.body.setGravityY(950);
//
//       speed = Phaser.Math.GetSpeed(300, 1);
//
//   // ===================
//   // ANIMATING PLAYER AND ENEMY
//   // ===================
//       this.anims.create({
//           key: 'left',
//           frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
//           frameRate: 10,
//           repeat: -1
//       });
//
//       this.anims.create({
//           key: 'turn',
//           frames: [ { key: 'dude', frame: 4 } ],
//           frameRate: 20
//       });
//
//       this.anims.create({
//           key: 'right',
//           frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//           frameRate: 10,
//           repeat: -1
//       });
//
//       this.anims.create({
//           key: 'enemy-left',
//           frames: this.anims.generateFrameNumbers('evilDude', { start: 0, end: 3 }),
//           frameRate: 10,
//           repeat: -1
//       });
//
//       this.anims.create({
//           key: 'enemy-turn',
//           frames: [ { key: 'evilDude', frame: 4 } ],
//           frameRate: 20
//       });
//
//       this.anims.create({
//           key: 'enemy-right',
//           frames: this.anims.generateFrameNumbers('evilDude', { start: 5, end: 8 }),
//           frameRate: 10,
//           repeat: -1
//       });
//
//       cursors = this.input.keyboard.createCursorKeys();
//
//   // ===================
//   // COLLISIONS
//   // ===================
//       this.physics.add.collider(player, Walls);
//       this.physics.add.collider(boss1, Walls);
//
//
//       Walls.setCollisionByProperty({ collides: true });
//
//       const boundGunMechanics = gunMechanics.bind(this);
//       boundGunMechanics();
//     },
//
//     update: function (time, delta)
//     {
//
//   // ====================
//   // Changing to 2nd Scene
//   // ====================
//     if (player.y === 576) {
//       loseHealth();
//       this.scene.start('Level5');
//     }
//
//     if (player.x === 784) {
//       debugger
//       this.scene.start('Level5');
//     }
//
//   // ====================
//   // Game over
//   // ====================
//       if (gameOver)
//       {
//           this.scene.start('Level5');
//           playerHealth = 3;
//           gameOver = false;
//       }
//
//
//       if (cursors.left.isDown)
//       {
//         player.setVelocityX(-360);
//         player.anims.play('left', true);
//         angle = "left";
//       }
//       else if (cursors.right.isDown)
//       {
//         player.setVelocityX(360);
//         player.anims.play('right', true);
//         angle = "right";
//       }
//       else
//       {
//         player.setVelocityX(0);
//         player.anims.play('turn');
//       }
//
//       this.input.keyboard.on("keydown_UP", function (event)
//       {
//         if (player.body.velocity.y === 0) {
//           player.setVelocityY(-490);
//         }
//       })
//
//       this.physics.moveToObject(boss1, player, 100);
//
//     },
// });
