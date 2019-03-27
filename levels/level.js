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
      bossHealth = 10;
      gameOver = false;
      // playerHealth = 3;
      document.querySelector('.health').innerText = `Health: ${playerHealth}`;
    }

    create ()
    {
      const map = this.make.tilemap({ key: `${this.map}` });
      const background = map.addTilesetImage('tiles1', 'background');
      const misc = map.addTilesetImage('misc', 'misc');
      const walls = map.addTilesetImage('walls', 'walls');
      const Background = map.createStaticLayer(0, background, 0, 0);
      const Misc = map.createStaticLayer(0, misc, 0, 0);
      const Walls = map.createStaticLayer("Walls", walls, 0, 0);
      // this.add.image(0, 0, 'sky').setOrigin(0, 0);

      spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      platforms = this.physics.add.staticGroup();

      player = this.physics.add.sprite( this.playerX,  this.playerY , 'dude');

      player.setBounce(0);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(950);

      speed = Phaser.Math.GetSpeed(300, 1);
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      enemies = this.physics.add.group({
        key: `evilDude`,
        repeat: 3,
        setXY: { x: 400, y: 480, stepX: 100 }
      });

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

      if(this.nextLevel === "Level6"){
          this.bossInfo();
        }

// ===================
// COLLISIONS
// ===================
      this.physics.add.collider(player, Walls);
      Walls.setCollisionByProperty({ collides: true });
      const boundGunMechanics = gunMechanics.bind(this);
      boundGunMechanics();

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
        this.scene.start('Level1');
        playerHealth = 3;
        gameOver = false;
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
      });
      /////////////

      enemies.children.entries.forEach((child) =>  {
        this.physics.moveToObject(child, player, 100)
     });

      enemies.children.entries.forEach((child) => {
        if(player.x > child.x)  {
          child.anims.play(`enemy-right`, true);
          child.body.setGravityY(300);
        } else if (player.x < child.x) {

          child.anims.play(`enemy-left`, true);
          child.body.setGravityY(300);
        }
      });

      if(this.nextLevel === "Level6") {
        this.physics.moveToObject(boss1, player, 100);
      }
    }
};
