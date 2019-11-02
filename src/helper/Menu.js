// import Star from '../sprites/item/Star';
// import Portion from '../sprites/item/Portion';
export default class Menu extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {
    super(config.scene);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.overlapArea = this.scene.add.graphics(
      {
        fillStyle: { color: 0x000000 }
      }
    );
    this.container = this.scene.add.container(0, 0);
    this.rect = new Phaser.Geom.Rectangle(0, 0, config.scene.game.config.width, config.scene.game.config.height);
    this.overlapArea.fillRectShape(this.rect);
    this.overlapArea.alpha = 0.75;
    this.container.setVisible(false);
    this.container.depth = 100;
    this.player = config.scene.add.sprite(
      config.scene.game.config.width/2,
      100,
      'player'
    );

    this.statusText = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      160,
      'bitmapFont',
      '',
      24
    );
    this.statusText.setText(
      [
        'ATTACK :'+this.scene.player.status.attackPoint,
        'DEFENCE:'+this.scene.player.status.defense
      ],
    );
    this.statusText.setOrigin(0.5,0.5);
    this.container.add([
      this.overlapArea,
      this.player,
      this.statusText
    ]);

  }
  show(){

  }
}
  