const Level2 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:
    function Level2 (){
    Phaser.Scene.call(this, { key: 'Level2' });
  },

  preload: function() {
    this.load.tilemapTiledJSON('map2', "assets/json/level2.json");
    this.load.image('background', "assets/json/tiles1.png");
    this.load.image('walls', "assets/json/space-tiles2.png");
    this.load.image('fireball', 'assets/fireball.png');
    this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  },

  create: function ()
  {
    const map2 = this.make.tilemap({ key: 'map2' });
    const background = map2.addTilesetImage('tiles1', 'background');
    const walls = map2.addTilesetImage('walls', 'walls');
    const Background = map2.createStaticLayer(0, background, 0, 0);
    const Walls = map2.createStaticLayer("Walls", walls, 0, 0);
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


  if (player.x === 784) {
    this.scene.start('Level3');
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
