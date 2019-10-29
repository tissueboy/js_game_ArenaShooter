import Item from './Item';

export default class Star extends Item {
  constructor(config) {
    super(config.scene);
    this.key = "star";
    this.frame = "star";
    this.scene.player.starMode();
    this.destroy();
  }
}