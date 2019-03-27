function hitEnemy (){
  if (isHit === false){
    // this.cameras.main.shake(100);
    loseHealth();
    isHit = true;
    player.setTint(0xff0000);
  }

  // Makes player invulnerable for 2 seconds after getting hit
  setTimeout(function() { isHit = false; player.setTint(0x00FFFFFF); }, 2000);
}

function loseHealth() {

  if (isHit === false){
    // this.cameras.main.shake(100);
    playerHealth--;
    document.querySelector('.health').innerText = `Health: ${playerHealth}`;
  }

  if (playerHealth === 0) {
    gameOver = true;
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

function hitBoss (bullet, boss)
  {
    bossHealth--;
    bullet.destroy();
    if (bossHealth === 0) {
      killBoss(boss);
    }
  }

function killBoss (boss) {

  boss.body.velocity.x = 0;
  boss.setTint(0xff0000);
  setTimeout(function () {
    boss.disableBody(true, true);
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
          if(bullet && cursors.left.isDown) {
          bullet.fire(player, "left");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
          self.physics.add.collider(bullet, boss1, hitBoss, null, this);
        } else if(bullet) {
          bullet.fire(player, "right");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
          self.physics.add.collider(bullet, boss1, hitBoss, null, this);
        }
      });
        this.input.on("pointerdown", (event) => {
          let bullet = this.bullets.get();
          if(bullet) {
            bullet.fire(player);
          }
        });
      }
