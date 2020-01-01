import Item from './Item';

export default class Portion extends Item {
  constructor(config) {
    super(config);
    // this.key = "portion";
    // this.frame = "portion";
    this.recoveryPoint = 5;
    config.scene.player.hp.calc(this.recoveryPoint,config.scene.player);
    this.destroy();  
  }
}