export default class ActiveTime extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.parent
    );
    /*==============================
    表示までのアニメーション
    ==============================*/
    this.geom_circle = new Phaser.Geom.Circle(this.x, this.y, config.parent.width);//x,y.size
    this.circle = this.scene.add.graphics({ fillStyle: { color: 0xFF0000 } });
    this.circle.fillCircleShape(this.geom_circle);
    this.circle.scaleX = 0;
    this.circle.scaleY = 0;

    this.pileUpSpeed = 0.04;
    this.flg_max = false;

    this.per = 0;
  }
  move(x,y){
    this.circle.x = x;
    this.circle.y = y;
  }
  pileUp(){
    if(this.per < 1){
      this.circle.scaleX += this.pileUpSpeed;
      this.circle.scaleY += this.pileUpSpeed;
      this.per = this.per + this.pileUpSpeed;
      this.flg_max = false;
    }else{
      this.circle.scaleX = 1;
      this.circle.scaleY = 1;      
      this.per = 1;
      this.flg_max = true;
    }
  }
  pileReset(){
    this.circle.scaleX = 0;
    this.circle.scaleY = 0;
    this.per = 0;
    this.flg_max = false;
  }
}
