const Default = new Phaser.Class({
  Extends: Phaser.Scene,

  preload: function() {
    this.load.image('background', "assets/json/tiles1.png");
    this.load.image('walls', "assets/json/space-tiles2.png");
    this.load.image('fireball', 'assets/fireball.png');
    this.load.spritesheet('evilDude', 'assets/evil-dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  },

  create: function ()
  {
    // const map2 = this.make.tilemap({ key: 'map2' });
    // const background = map2.addTilesetImage('tiles1', 'background');
    // const walls = map2.addTilesetImage('walls', 'walls');
    // const Background = map2.createStaticLayer(0, background, 0, 0);
    // const Walls = map2.createStaticLayer("Walls", walls, 0, 0);
    // // this.add.image(0, 0, 'sky').setOrigin(0, 0);

    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    platforms = this.physics.add.staticGroup();

    player = this.physics.add.sprite(700, 350, 'dude');
    enemies = this.physics.add.group();

    const enemyGeneration = () => {setTimeout(() => {
      if (player.x < 400)
      {
        let enemy = enemies.create(700, 416, 'evilDude');
        enemy.setCollideWorldBounds(true);
        enemy.body.setGravityY(950);
        // debugger

        // ====================
        // Enemy following player animations
        // ====================
          if (player.x > enemy.x) {
            enemy.anims.play('enemy-right', true);
          } else if (player.x < enemy.x) {
            enemy.anims.play('enemy-left', true);
          } else {
            enemy.anims.play('enemy-turn', true);
          }
          // Enemy moves towards player
          this.physics.moveToObject(enemy, player, 100);
        }
      }, 2000);
    }

    enemyGeneration();

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(950);

  // ===================
  // BULLET STUFF
  // ===================

  var Fireball = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Fireball (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fireball');
        this.speed = Phaser.Math.GetSpeed(400, 1);
    },

    fire: function (x, y)
    {
      if (angle === "left") {
        this.setPosition(x + 5, y);
      } else if (angle === "right") {
        this.setPosition(x - 5, y);
      }
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta)
    {
      if (angle === "left") {
        this.x -= this.speed * delta;
      } else if (angle === "right") {
        this.x += this.speed * delta;
      }
        if (this.x < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        } else if (this.x > 800) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
  });
},

  update: function (time, delta)
  {
  // ====================
  // Changing to 2nd Scene
  // ====================
  if (player.x === 784) {
    this.scene.start('Level2');
  }

  // ====================
  // Game over
  // ====================
    if (gameOver)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        return;
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

    if (cursors.up.isDown)
    {
      player.setVelocityY(-430);
    }

    if (spaceBar.isDown) {
      let fireball = fireballs.get();

      if (fireball)
        {
          fireball.fire(player.x, player.y);
          lastFired = time + 450;
        }
      }
    }
})
