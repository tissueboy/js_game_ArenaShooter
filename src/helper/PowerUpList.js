export default class PowerUpList extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.list = [];

    this.maxLevel = 5;

    this.index = 0;

    this.setAlpha = 0.4;

    this.powerUpListGroup = this.scene.add.group();

    for(var i = 1;i <= this.maxLevel;i++){
      let item = config.scene.add.sprite(28+i*2+(i-1)*32, config.scene.game.config.height - 10, 'powerUpList_'+i);
      item.setScrollFactor(0);
      if(i === 1){
        item.alpha = 1;
      }else{
        item.alpha = this.setAlpha;
      }
      this.powerUpListGroup.add(item);
    }


    // this.cursor = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    // this.cursor.setScrollFactor(0);
    // this.rect = new Phaser.Geom.Rectangle(0, 0, 32, 12);
    // this.cursor.strokeRectShape(this.rect);
    // this.cursor.x = 14;
    // this.cursor.y = 300;

  }
  addStep(count){

    this.index += count;

    if(this.index > (this.maxLevel-1)){
      /*LEVELの最高値だったら返す*/
      this.index = this.maxLevel-1;
      return;
    }
    if(this.index < 0){
      /*LEVELが0以下になったら0にして返す*/
      this.index = 0;
      return;
    }
    this.powerUpListGroup.children.entries.forEach(
      (sprite,index) => {
        if(index === this.index){
          sprite.alpha = 1;
        }else{
          sprite.alpha = this.setAlpha;
        }
      }
    );

    /*再設定*/
    // this.cursor.x = 12+this.index*2+(this.index)*32;
    this.scene.player.status.level = this.index + 1;
  }
}
