export default class ComboCount extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.comboHit = this.scene.add.bitmapText(
      180,
      70,
      'bitmapFontYellow',
      'HIT',
      30
    );
    this.comboHit.depth = 104;
    this.comboHit.setScrollFactor(0,0);
    this.comboHit.setOrigin(1);

    this.combo_count = 0;

    this.comboText = this.scene.add.bitmapText(
      180,
      54,
      'bitmapFontYellow',
      this.combo_count,
      60
    );

    this.comboText.depth = 104;

    this.comboText.setScrollFactor(0,0);
    this.comboText.setOrigin(1);

    this.comboHit.visible = false;
    this.comboText.visible = false;

  }
  hit(){
    // this.comboHit.visible = true;
    // this.comboText.visible = true;
    var _comboText = this.comboText;

    var _comboText_x_before = this.comboText.x - 12;
    var _comboText_x_after = this.comboText.x;

    var _comboHit = this.comboHit;
    var _this = this;
    this.combo_count++;
    this.comboText.text = this.combo_count;
    if(this.combo_count > 1){
      this.comboHit.visible = true;
      this.comboText.visible = true;
      var comboTween = this.scene.tweens.add({
        targets: _comboText,
        tweens: [{
          x: _comboText_x_before,
        },
        {
          x: _comboText_x_after,
        }],
        ease: 'liner',
        duration: 100,
        repeat: 0,
        completeDelay: 400,
        onComplete: function () {
          // _this.combo_count = 0;
          // _this.comboText.x = _comboText_x_after;
          _comboText.setVisible(false);
          _comboHit.setVisible(false);
        }
      });
    }

  }
}
