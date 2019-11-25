export default class Scope extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.target
    );
    
    /*==============================
    パラメータ
    ==============================*/
    this.player_shot_line = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.player_shot_line.lineStyle(2, 0xFFFFFF);
    this.shotVelocity = new Phaser.Math.Vector2();
    this.countTouch = 0;

    this.playerShotLineLength = 40;

    this.head = this.scene.add.sprite(config.target.x, config.target.y + this.playerShotLineLength, 'scope');
    config.scene.physics.world.enable(this.head);
    config.scene.add.existing(this.head);
    this.head.setVisible(false);
    this.head.vector = {
      x: 1,
      y: 1
    }
    this.head.x = config.target.x + this.playerShotLineLength*this.head.vector.x;
    this.head.y = config.target.y + this.playerShotLineLength*this.head.vector.y;

    this.playerShotLine = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.playerShotLine.lineStyle(2, 0xFFFFFF);

    this.line_x = 0;
    this.line_y = 0;

  }
}
