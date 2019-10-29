export default class Hp extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.hp = 10;
    this.hpMax = 10;

    this.hp_bar = config.scene.add.sprite(10, 10, 'hp_bar');
    this.hp_bar.setScrollFactor(0,0);
    this.hp_bar.displayWidth = config.scene.game.config.width - 20;
    this.hp_bar.displayWidthMax = config.scene.game.config.width - 20;
    this.hp_bar.displayOriginX = 0;
    this.hp_bar.displayOriginY = 0;
    this.hp_bar.depth = 105;


    this.hp_bar_bg = config.scene.add.sprite(10, 10, 'hp_bar_bg');
    this.hp_bar_bg.displayWidth = config.scene.game.config.width - 20;
    this.hp_bar_bg.displayWidthMax = config.scene.game.config.width - 20;
    this.hp_bar_bg.displayOriginX = 0;
    this.hp_bar_bg.displayOriginY = 0;
    this.hp_bar_bg.alpha = 0.4;    
    this.hp_bar_bg.setScrollFactor(0,0);
    this.hp_bar_bg.depth = 104;

    this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xFFFFFF }});
    this.rect = new Phaser.Geom.Rectangle(9, 9, config.scene.game.config.width - 18, 14);
    this.graphics.strokeRectShape(this.rect);
    this.graphics.depth = 104;

  }
  calc(num,obj){

    this.hp = this.hp + num;

    if(this.hp >= this.hpMax){
      this.hp = this.hpMax;
    }
    this.hp_bar.displayWidth = this.hp_bar.displayWidthMax * (this.hp / this.hpMax);
    if(this.hp <= 0){
      // obj.explode();
      // this.explode();
    }
  }
}
