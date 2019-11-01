import EnemyChase from './EnemyChase';

export default class Bad extends EnemyChase {

  constructor(config) {

    super(config);

    this._scene = config.scene;

    this.status = {
      hp: 2,
      power: 5,
      defense: 2,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }
    this.anims.play('badAnime', true);
  }
  update(keys, time, delta) {
    if (!this.active) {
      return;
    }
    this.handleChase();
    this.hp.move(this.x,this.y);

  }

}