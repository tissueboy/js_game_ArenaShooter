export default class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.mode
    );
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.mode = config.mode ? config.mode : "";
    this.active;
    this.visible;
    this.delayActiveTimerEvent;
    this.circle;
    this.appearCircle;
    this.hitCount = 0;

    /*==============================
    表示までOFF
    ==============================*/
    if(this.mode === "dropEnemyItem"){
      this.active = true;
      this.visible = true;
    }else{
      this.active = false;
      this.visible = false;
      this.delayActiveTimerEvent = this.scene.time.addEvent({
        delay: 2000,
        callback: this.appearObj,
        callbackScope: this
      });
      /*==============================
      表示までのアニメーション
      ==============================*/
      this.circle = new Phaser.Geom.Circle(this.x, this.y, 10);//x,y.size
      this.appearCircle = this.scene.add.graphics({ fillStyle: { color: 0xFF0000 } });
      this.appearCircle.fillCircleShape(this.circle);
      this.appearCircle.depth = 1;
    }

  }
  checkCollision(item,obj){
    //collider用
    //@todo エフェクトとか作る
    
    return;    
  }
  appearObj(){
    this.active = true;
    this.visible = true; 
    this.delayActiveTimerEvent.remove(false);
    this.delayActiveTimerEvent = null;
    this.appearCircle.destroy();
  }
}