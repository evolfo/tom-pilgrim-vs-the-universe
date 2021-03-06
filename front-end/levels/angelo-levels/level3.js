const Level3 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:
    function Level3 (){
    Phaser.Scene.call(this, { key: 'Level3' });
  },


    preload: function ()
    {
      // this.load.image('sky', 'assets/sky.png');
      // this.load.image('ground', 'assets/platform.png');
      this.load.tilemapTiledJSON('map3', "assets/json/level3.json");
      this.load.image('background', "assets/json/tiles1.png");
      this.load.image('misc', "assets/json/zelda-tiles.png");
      this.load.image('walls', "assets/json/space-tiles2.png");
      this.load.image('bullet', 'assets/bomb.png');
      this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    },

    create: function ()
    {
      const map = this.make.tilemap({ key: 'map3' });
      const background = map.addTilesetImage('tiles1', 'background');
      const misc = map.addTilesetImage('misc', 'misc');
      const walls = map.addTilesetImage('walls', 'walls');
      const Background = map.createStaticLayer(0, background, 0, 0);
      const Misc = map.createStaticLayer(0, misc, 0, 0);
      const Walls = map.createStaticLayer("Walls", walls, 0, 0);
      // this.add.image(0, 0, 'sky').setOrigin(0, 0);

      spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      platforms = this.physics.add.staticGroup();

      player = this.physics.add.sprite(20, 350, 'dude');
      enemies = this.physics.add.group({
         key: 'evilDude',
         repeat: 1,
         setXY: { x: 400, y: 250, stepX: 400 }
       });

       let boundHitEnemy = hitEnemy.bind(this);

       enemies.children.iterate( (child) => {
          this.physics.add.collider(player, child, boundHitEnemy, null, this);
          this.physics.add.collider(enemies, child );
          child.body.setGravityY(300);
        });

      player.setBounce(0);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(950);

   speed = Phaser.Math.GetSpeed(300, 1);

  // ===================
  // ANIMATING PLAYER AND ENEMY
  // ===================
      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'enemy-left',
          frames: this.anims.generateFrameNumbers('evilDude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'enemy-turn',
          frames: [ { key: 'evilDude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'enemy-right',
          frames: this.anims.generateFrameNumbers('evilDude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });

      cursors = this.input.keyboard.createCursorKeys();

  // ===================
  // COLLISIONS
  // ===================
      this.physics.add.collider(player, Walls);
      this.physics.add.collider(enemies, Walls);

      Walls.setCollisionByProperty({ collides: true });

      const boundGunMechanics = gunMechanics.bind(this);
      boundGunMechanics();
    },

    update: function (time, delta)
    {

  // ====================
  // Changing to 2nd Scene
  // ====================
    if (player.y === 576) {
      loseHealth();
      this.scene.start('Level3');
    }

    if (player.x === 784) {
      this.scene.start('Level4');
    }

  // ====================
  // Game over
  // ====================
      if (gameOver)
      {
          this.scene.start('Level1');
      }


      if (cursors.left.isDown)
      {
        player.setVelocityX(-360);
        player.anims.play('left', true);
        angle = "left";
      }
      else if (cursors.right.isDown)
      {
        player.setVelocityX(360);
        player.anims.play('right', true);
        angle = "right";
      }
      else
      {
        player.setVelocityX(0);
        player.anims.play('turn');
      }

      this.input.keyboard.on("keydown_UP", function (event)
      {
        if (player.body.velocity.y === 0) {
          player.setVelocityY(-490);
        }
      })

      enemies.children.entries.forEach((child) =>  {
       this.physics.moveToObject(child, player, 100)
      });

     enemies.children.entries.forEach((child) => {
       if(player.x > child.x)  {
         child.anims.play("enemy-right", true);
         child.body.setGravityY(300);
       } else if (player.x < child.x) {

         child.anims.play("enemy-left", true);
         child.body.setGravityY(300);
       }
     });

    },
});

// class Level1 extends Level {
//   constructor(){
//     super(config)
//     this.mapSrc = 'level1.json';
//     this.nextLevel = 'Level2';
//     this.map = 'map1';
//     this.playerX = 100;
//     this.playerY = 480;

//     Phaser.Scene.call(this, { key: 'Level1' });
//   }
//   //
//   // playerInfo(){
//   //       player = this.physics.add.sprite(100, 480, 'dude');
//   //       player.setBounce(0);
//   //       player.setCollideWorldBounds(true);
//   //       player.body.setGravityY(950);
//   // }


// }

// // const Level1  =  new Level( 'level1.json','Level2');

// // const Level1 = new Phaser.Class({
// //
// //   Extends: Phaser.Scene,
// //
// //   initialize:
// //     function Level1 (){
// //     Phaser.Scene.call(this, { key: 'Level1' });
// //   },
// //
// //
// //     preload: function ()
// //     {
// //       // this.load.image('sky', 'assets/sky.png');
// //       // this.load.image('ground', 'assets/platform.png');
// //       this.load.tilemapTiledJSON('map', "assets/json/level1.json");
// //       this.load.image('background', "assets/json/tiles1.png");
// //       this.load.image('misc', "assets/json/zelda-tiles.png");
// //       this.load.image('walls', "assets/json/space-tiles2.png");
// //       this.load.image('bullet', 'assets/bomb.png');
// //       this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
// //       this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
// //
// //       gameOver = false;
// //       playerHealth = 3;
// //       document.querySelector('.health').innerText = `Health: ${playerHealth}`;
// //     },
// //
// //     create: function ()
// //     {
// //       const map = this.make.tilemap({ key: 'map' });
// //       const background = map.addTilesetImage('tiles1', 'background');
// //       const misc = map.addTilesetImage('misc', 'misc');
// //       const walls = map.addTilesetImage('walls', 'walls');
// //       const Background = map.createStaticLayer(0, background, 0, 0);
// //       const Misc = map.createStaticLayer(0, misc, 0, 0);
// //       const Walls = map.createStaticLayer("Walls", walls, 0, 0);
// //       // this.add.image(0, 0, 'sky').setOrigin(0, 0);
// //
// //       spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
// //
// //       platforms = this.physics.add.staticGroup();
// //
// //       player = this.physics.add.sprite(100, 350, 'dude');
// //
// //       player.setBounce(0);
// //       player.setCollideWorldBounds(true);
// //       player.body.setGravityY(950);

// //
// // // ===================
// // // COLLISIONS
// // // ===================
// //       this.physics.add.collider(player, Walls);
// //
// //       const boundHitEnemy = hitEnemy.bind(this);
// //
// //       Walls.setCollisionByProperty({ collides: true });
// //     },
// //
// //     update: function (time, delta)
// //     {
// //
// // // ====================
// // // Changing to 2nd Scene
// // // ====================
// //     if (player.x === 784) {
// //       this.scene.start('Level2');
// //     }
// //
// // // ====================
// // // Game over
// // // ====================
// //       if (gameOver)
// //       {
// //
// //       }
// //
// //
// //       if (cursors.left.isDown)
// //       {
// //         player.setVelocityX(-360);
// //         player.anims.play('left', true);
// //         angle = "left";
// //       }
// //       else if (cursors.right.isDown)
// //       {
// //         player.setVelocityX(360);
// //         player.anims.play('right', true);
// //         angle = "right";
// //       }
// //       else
// //       {
// //         player.setVelocityX(0);
// //         player.anims.play('turn');
// //       }
// //       this.input.keyboard.on("keydown_UP", function (event)
// //       {
// //         if (player.body.velocity.y === 0) {
// //           player.setVelocityY(-490);
// //         }
// //       })
// //     },
// // });
// >>>>>>> 8876c95b66ee3d086d23e7588385b3a4ef87c615:levels/level1.js
