import Enemy from '../Enemy';

export default class Robot extends Enemy {

  constructor(config) {

    super(
      config
    );

    this.key = "robot_base";
    this.type = "boss";
    // this.x = config.scene.game.config.width/2,
    // this.y = 80;
    this.arm_l = this.scene.add.sprite(this.x-14, this.y+12, 'robot_arm_l');
    config.scene.physics.world.enable(this.arm_l);
    config.scene.add.existing(this.arm_l);

    this.arm_r = this.scene.add.sprite(this.x+14, this.y+12, 'robot_arm_r');
    config.scene.physics.world.enable(this.arm_r);
    config.scene.add.existing(this.arm_r);

    // this._scene = config.scene;

    this.status = {
      hp: 2,
      power: 5,
      defense: 2,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }
  }
  // update(keys, time, delta) {
  //   if (!this.active) {
  //     return;
  //   }
  //   this.hp.move(this.x,this.y);
  // }

}