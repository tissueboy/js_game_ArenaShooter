import Item from './Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);
    this.recoveryPoint = 1;
  }
  hit(){
    this.scene.player.hp.calc(this.recoveryPoint);
    this.destroy();
  }
}