function hitEnemy (){
  if (isHit === false){
    this.cameras.main.shake(100);
    playerHealth--;
    document.querySelector('.health').innerText = `Health: ${playerHealth}`;
    isHit = true;
    player.setTint(0xff0000);
  }

  // Makes player invulnerable for 2 seconds after getting hit
  setTimeout(function() { isHit = false; player.setTint(0x00FFFFFF); }, 2000);

  if (playerHealth === 0) {
    playerHealth = 3;
    document.querySelector('.health').innerText = `Health: ${playerHealth}`;
    this.scene.start('Level1');
  }
}

function killEnemy (bullet, enemy)
  {
      bullet.destroy();
      enemy.body.velocity.x = 0;
      enemy.anims.play('enemy-turn');
      enemy.setTint(0xff0000);
      setTimeout(function () {
        enemy.disableBody(true, true);
      }, 200);
  }

function gunMechanics() {
  this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
      });
      this.input.keyboard.on("keydown_SPACE", function (event) {
        const self = this.scene;
        let bullet = this.scene.bullets.get();
        if(bullet && cursors.right.isDown) {
          bullet.fire(player, "right");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
        } else if(bullet && cursors.left.isDown) {
          bullet.fire(player, "left");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
        } else {
          bullet.fire(player, "right");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
        }
      });
        this.input.on("pointerdown", (event) => {
          let bullet = this.bullets.get();
          if(bullet) {
            bullet.fire(player);
          }
        });
      }
