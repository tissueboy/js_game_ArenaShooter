import Item from './Item';

export default class Portion extends Item {
  constructor(config) {
    super(config.scene);
    this.key = "portion";
    this.frame = "portion";
    this.recoveryPoint = 5;
    this.scene.player.hp.calc(this.recoveryPoint);
    this.destroy();  
  }
}