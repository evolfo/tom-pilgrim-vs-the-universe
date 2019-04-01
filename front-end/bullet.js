class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.scene.physics.world.enable(this);
    }
    fire(gun, direction) {
        this.speed = 400;
        this.lifespan = 3000;
        this.setActive(true);
        this.setVisible(true);
        const width = gun.width / 2 + this.width / 2;
        const offset = new Phaser.Geom.Point(width, 0);
        this.setPosition(gun.x + offset.x - 20, gun.y + offset.y);

        let angle;
        if (direction === "left"){
           this.rotation = 380;
           // debugger
           angle = Phaser.Math.DegToRad(gun.body.rotation - 180);
        } else if (direction === "right"){
          this.rotation = 0;

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
