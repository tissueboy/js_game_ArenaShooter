import Enemy from '../Enemy';
import Calcs from '../../../helper/Calcs';

export default class Shadow extends Enemy {

  constructor(config) {

    super(config);

    this.type = "boss";
    this.key = "shadow";
    this.depth = 1;

    this.base_y = this.y;

    this.status = {
      hp: 20,
      power: 5,
      defense: 4,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }

    let _this = this;

    this.calc = new Calcs();


  }
  update(keys, time, delta) {

    if (!this.active) {
      return;
    }

    if (this.active) {
      this.hp.move(this.x,this.y);
    }
  }
}