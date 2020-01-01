import Item from './Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);
    // this.key = "heart";
    // this.frame = "heart";
    this._scene = config.scene;
    this.recoveryPoint = 1;
  }
  hit(){
    this.scene.player.hp.calc(this.recoveryPoint,this.scene.player);
    this.destroy();
  }
}