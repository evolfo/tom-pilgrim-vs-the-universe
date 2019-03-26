class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, ‘bullet’);
        this.scene.physics.world.enable(this);
    }
    fire(gun, direction) {
        this.speed = 300;
        this.lifespan = 3000;
        this.setActive(true);
        this.setVisible(true);
        const width = gun.width / 2 + this.width / 2;
        const offset = new Phaser.Geom.Point(width, 0);
        this.setPosition(gun.x + offset.x - 20, gun.y + offset.y  );
        let angle;
        if (direction === “left”){
           angle = Phaser.Math.DegToRad(gun.body.rotation - 180);
        } else if (direction === “right”){
           angle = Phaser.Math.DegToRad(gun.body.rotation)
        }
        this.body.world.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
    }
    update(time, delta) {
        this.lifespan -= delta;
        if (this.lifespan <= 0) {
          this.setActive(false);
          this.setVisible(false);
          this.body.stop();
        }
    }
}
// class Gun extends Phaser.Scene {
//   constructor(config) {
//     super({
//       key: “Gun”
//     });
//   }
// }
  const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: ‘phaser-example’,
      // scene: [Gun],
      physics: {
          default: ‘arcade’,
          arcade: {
              gravity: { z: 300 },
              debug: false
          }
      },
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };
  let score = 0;
  let scoreText;
  let cursors;
  let platforms, player, enemy, stars, bombs, mummy, walk;
  let gameOver = false;
  // let gun, bullets;
  const game = new Phaser.Game(config);
  function preload ()
  {
      this.load.image(‘gun’, ‘assets/star.png’);
      this.load.image(‘bullet’, ‘assets/bomb.png’);
      this.load.image(‘sky’, ‘assets/sky.png’);
      this.load.image(‘ground’, ‘assets/platform.png’);
      this.load.image(‘star’, ‘assets/star.png’);
      this.load.image(‘bomb’, ‘assets/bomb.png’);
      this.load.spritesheet(‘dude’,
          ‘assets/dude.png’,
          { frameWidth: 32, frameHeight: 48 }
      );
      this.load.spritesheet(‘evilDude’,
          ‘assets/evil-dude.png’,
          { frameWidth: 32, frameHeight: 48 }
      );
      this.load.spritesheet(‘mummy’, ‘assets/metalslug_mummy37x45.png’,   {  frameWidth: 37, frameHeight: 45 });
  }
  function create () {
    // all else
    this.add.image(400, 300, ‘sky’);
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, ‘ground’).setScale(2).refreshBody();
    player = this.physics.add.sprite(100, 450, ‘dude’);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: ‘left’,
        frames: this.anims.generateFrameNumbers(‘dude’, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: ‘turn’,
        frames: [ { key: ‘dude’, frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: ‘right’,
        frames: this.anims.generateFrameNumbers(‘dude’, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);
    //enemyyy
    enemy = this.physics.add.sprite(450, 100, ‘evilDude’);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true);
    enemy.body.setGravityY(10000);
    this.physics.add.collider(enemy, platforms);killEnemy
    this.physics.add.collider(player, enemy, hitEnemy, null, this);
    // this.physics.add.overlap(this.bullets, enemy, killEnemy, null, this);
    this.anims.create({
        key: ‘left-enemy’,
        frames: this.anims.generateFrameNumbers(‘evilDude’, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: ‘turn-enemy’,
        frames: [ { key: ‘evilDude’, frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: ‘right-enemy’,
        frames: this.anims.generateFrameNumbers(‘evilDude’, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    // shooting
    // this.gun = this.physics.add.image(400, 300, ‘gun’ );c
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // debugger
    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true
    });
    this.input.keyboard.on(‘keydown_SPACE’, function (event) {
      const self = this.scene;
      let bullet = this.scene.bullets.get();
      if(bullet && cursors.right.isDown) {
        bullet.fire(player, “right”);
        self.physics.add.collider(bullet, enemy, killEnemy, null, this);
      } else if(bullet && cursors.left.isDown) {
        bullet.fire(player, “left”);
        self.physics.add.collider(bullet, enemy, killEnemy, null, this);
      }
    });
      this.input.on(“pointerdown”, (event) => {
        let bullet = this.bullets.get();
        if(bullet) {
          bullet.fire(player);
        }
      });
  }
  function hitEnemy (player, enemy)
  {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play(‘turn’);
    gameOver = true;
  }
  // function killEnemy (bullets, enemy)
  // {
  //   enemy
  //
  //   player.setTint(0xff0000);
  //
  //   player.anims.play(‘turn’);
  //
  //   gameOver = true;
  // }
  function killEnemy (bullet, enemy)
  {
    // debugger
      bullet.destroy();
      enemy.body.velocity.x = 0;
      enemy.anims.play(‘turn-enemy’);
      enemy.setTint(0xff0000);
      setTimeout(function () {
        enemy.disableBody(true, true);
      }, 200);
  }
  function update () {
    if (gameOver){
      return;
    }
    if(player.x > enemy.x)  {
      enemy.anims.play(‘right-enemy’, true);
    } else if (player.x < enemy.x) {
      enemy.anims.play(‘left-enemy’, true);
    }
    this.physics.moveToObject(enemy, player, 100);
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play(‘left’, true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play(‘right’, true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play(‘turn’);
    }
    if (cursors.up.isDown && player.body.touching.down )
    {
      player.setVelocityY(-480);
    }
  }
