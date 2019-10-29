export default class Sword extends Phaser.GameObjects.Sprite {
    constructor(config) {

      super(config.scene,config.x,config.y,config.key,config.vx,config.vy,config.target);
      
      this.type = "sword";

      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);

      this.target = config.target;

      // this.scene.anims.create({
      //     key: 'sword_anime',
      //     frames: this.scene.anims.generateFrameNumbers('sword', { start: 1, end: 4 }),
      //     frameRate: 10,
      //     repeat: -1
      // });
      // this.anims.play('sword_anime', true);

      this.attackPoint = 1 * this.target.status.power;

      this.speed = 1;
      this.depth = 20;

      this.vx = config.vx;
      this.vy = config.vy;
      
      this.body.setGravity(0,0);
      // this.body.setVelocity(config.vx*this.speed,config.vy*this.speed);
      this.radian = Math.atan2(this.vx, this.vy);
      // this.body.setCircle(8);
      // this.body.setSize(0, 8, false);
      this.angle = this.radian * -180 / Math.PI - 180;  
      // this.rotation = this.radian * -180 / Math.PI - 180;  
      // this.setOrigin(0,0);

      this.x = config.x;
      this.y = config.y;

    }

    update(time, delta) {
      // this.rotation += 1;
    }

    collided() {

    }

    explode() {
      this.destroy();
    }
}
