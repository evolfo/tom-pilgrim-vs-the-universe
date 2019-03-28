class Level extends Phaser.Scene {

      constructor (config)
    {
      super(config);
    }

    preload ()
    {
      // ${this.map_route}
      this.load.tilemapTiledJSON(`${this.map}`, `assets/json/${this.mapSrc}`);
      this.load.image('background', "assets/json/tiles1.png");
      this.load.image('misc', "assets/json/zelda-tiles.png");
      this.load.image('walls', "assets/json/space-tiles2.png");
      this.load.image('bullet', 'assets/bomb.png');
      this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('boss1', 'assets/boss1.png', { frameWidth: 55, frameHeight: 80 });
      this.load.spritesheet('boss2', 'assets/boss2.png', { frameWidth: 55, frameHeight: 80 });
      this.load.spritesheet('finalBoss', 'assets/final-boss.png', { frameWidth: 60, frameHeight: 70 });
      bossHealth = 15;
      gameOver = false;
      document.querySelector('.health').innerText = `Health: ${playerHealth}`;
    }

    create ()
    {
      const map = this.make.tilemap({ key: `${this.map}` });
      const background = map.addTilesetImage('tiles1', 'background');
      const walls = map.addTilesetImage('walls', 'walls');
      const Background = map.createStaticLayer(0, background, 0, 0);
      const Walls = map.createStaticLayer("Walls", walls, 0, 0);

// ADDING PLAYER
      player = this.physics.add.sprite( this.playerX,  this.playerY , 'dude');

      player.setBounce(0);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(950);

      speed = Phaser.Math.GetSpeed(300, 1);
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

// ADDING ENEMIES
      enemies = this.physics.add.group({
        key: `evilDude`,
        repeat: this.enemyCount,
        setXY: { x: Phaser.Math.Between(350, 600), y: Phaser.Math.Between(200, 600), stepX: Phaser.Math.Between(150, 170), stepX: Phaser.Math.Between(50, 100) }
      });

// BINDING PLAYER HITTING ENEMY FUNCTION TO THIS
      let boundHitEnemy = hitEnemy.bind(this);

      enemies.children.iterate( (child) => {
         this.physics.add.collider(player, child, boundHitEnemy, null, this);
         this.physics.add.collider(enemies, child );
         child.body.setGravityY(300);
       });

       enemies.children.entries.forEach((child) =>  {
         this.physics.moveToObject(child, player, 100)
       });
       this.physics.add.collider(enemies, Walls);

// ===================
// ANIMATING PLAYER AND BASIC ENEMY
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

      if(this.nextLevel === "Level6"){
          this.bossInfo();
        }

      if(this.nextLevel === "Level11"){
          this.boss2Info();
          this.physics.add.collider(boss2, Walls);
        }

        if(this.nextLevel === "Level16"){
            this.finalBossInfo();
            this.physics.add.collider(finalBoss, Walls);
          }

// ===================
// COLLISIONS
// ===================
      this.physics.add.collider(player, Walls);
      Walls.setCollisionByProperty({ collides: true });

      this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
      });

      this.physics.add.collider(this.bullets, Walls);
      this.physics.add.collider(player, boss1, boundHitEnemy, null, this);
      this.physics.add.collider(player, boss2, boundHitEnemy, null, this);
      this.physics.add.collider(player, finalBoss, boundHitEnemy, null, this);

      const boundGunMechanics = gunMechanics.bind(this);
      boundGunMechanics(this.bullets);

    }

    update(time, delta)
    {
// ====================
// Changing SCENES
// ====================
    if (player.x === 784) {
      // debugger
      this.scene.start(this.nextLevel);
    }

    if (player.y === 576) {
       loseHealth();
       this.scene.start(`${this.scene.key}`);
     }

    if (gameOver)
    {
        this.sys.game.destroy(true);
        gameOverScreen();
        // Removing Game Window
        document.querySelector('canvas').remove();

    }
// ===============
// PLAYER MOVEMENT
// ===============
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


      if (left.isDown)
      {
        player.setVelocityX(-360);
        player.anims.play('left', true);
        angle = "left";
      }
      else if (right.isDown)
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
      });
// ==============
// ENEMY MOVEMENT
// ==============

// ENEMIES MOVES TOWARDS PLAYER
      enemies.children.entries.forEach((child) =>  {
        this.physics.moveToObject(child, player, 100)
     });

//ENEMIES ANIMATE
      enemies.children.entries.forEach((child) => {
        if(player.x > child.x)  {
          child.anims.play(`enemy-right`, true);
          child.body.setGravityY(300);
        } else if (player.x < child.x) {

          child.anims.play(`enemy-left`, true);
          child.body.setGravityY(300);
        }
      });

// BOSS MOVING TOWARDS PLAYER

      if(this.nextLevel === "Level6") {
        this.physics.moveToObject(boss1, player, 100);
      }

      if(this.nextLevel === "Level11") {
        this.physics.moveToObject(boss2, player, 300);
      }

      if(this.nextLevel === "Level16") {
        this.physics.moveToObject(finalBoss, player, 300);
      }
    }
};
