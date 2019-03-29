// ========================================================
// WHEN THE PLAYER COLLIDES WITH AN ENEMY OR BOSS THIS RUNS
// ========================================================

function hitEnemy (){
  if (isHit === false){
    // this.cameras.main.shake(100);
    loseHealth();
    isHit = true;
    player.setTint(0xff0000);
    hearts.children.entries[0].body.gameObject.destroy(this.scene);
  }

  // Makes player invulnerable for 2 seconds after getting hit
  setTimeout(function() { isHit = false; player.setTint(0x00FFFFFF); }, 2000);
}

// =============
// LOSING HEALTH
// =============

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

function removeHeart(heart) {
  if (!hitEnemyIsRunning) {
    hitEnemyIsRunning = true;
    heart.disableBody(true, true);
    hitEnemyIsRunning = false;
  }
}

// ================
// INCREASING Score
// ================

function increaseScore() {
  score += 10;
  scoreDisplay.innerText = `Score: ${score}`;
}

function killEnemy (bullet, enemy)
  {
      bullet.destroy();
      enemy.body.velocity.x = 0;
      enemy.anims.play('enemy-turn');
      enemy.setTint(0xff0000);
      setTimeout(function () {
        if ( enemy != undefined){
          enemy.disableBody(true, true);
        }
      }, 200);
      increaseScore();
  }

// ===================
// Boss Damage functions
// ===================

function hitBoss (bullet, boss)
  {
    bossHealth--;
    bullet.destroy();
    if (bossHealth === 0) {
      killBoss(boss);
    }
  }

function killBoss (boss) {

  if (boss.texture.key === "finalBoss") {
    victory = true;
  }

  boss.body.velocity.x = 0;
  boss.setTint(0xff0000);
  setTimeout(function () {
    boss.disableBody(true, true);
  }, 200);
  increaseScore();
}

// ==============
// FIRING BULLETS
// ==============

function gunMechanics(bullets) {
  this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.input.keyboard.on("keydown_SPACE", function (event) {
        const self = this.scene;
        let bullet = this.scene.bullets.get();
          if((bullet && player.body.facing === 13) || (player.body.facing === 11 && left.isDown)) {
          bullet.fire(player, "left");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
          self.physics.add.collider(bullet, boss1, hitBoss, null, this);
          self.physics.add.collider(bullet, boss2, hitBoss, null, this);
          self.physics.add.collider(bullet, finalBoss, hitBoss, null, this);
        } else if(bullet) {
          bullet.fire(player, "right");
          self.physics.add.collider(bullet, enemies, killEnemy, null, this);
          self.physics.add.collider(bullet, boss1, hitBoss, null, this);
          self.physics.add.collider(bullet, boss2, hitBoss, null, this);
          self.physics.add.collider(bullet, finalBoss, hitBoss, null, this);
        }
        else if(bullet.body.velocity.x === 0) {
          bullet.disableBody(true, true);
        }
      });
        this.input.on("pointerdown", (event) => {
          let bullet = this.bullets.get();
          if(bullet) {
            bullet.fire(player);
          }
        });
      }
