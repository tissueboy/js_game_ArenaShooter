export default class ActiveTime extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene, config.x, config.y, config.key);

    this.bar = 0;
    this.barMax = 10;


    this.active_bar = config.scene.add.sprite(10, 25, 'active_bar');
    this.active_bar.setScrollFactor(0,0);
    this.active_bar.displayWidth = 0;
    this.active_bar.displayWidthMax = config.scene.game.config.width / 2 - 20;
    this.active_bar.displayOriginX = 0;
    this.active_bar.displayOriginY = 0;
    this.active_bar.depth = 104;
    this.active_bar_base = config.scene.add.sprite(10, 25, 'active_bar');
    this.active_bar_base.displayWidth = 0;
    this.active_bar_base.displayWidthMax = config.scene.game.config.width / 2 - 20;
    this.active_bar_base.displayOriginX = 0;
    this.active_bar_base.displayOriginY = 0;
    this.active_bar_base.alpha = 0.4;    
    this.active_bar_base.setScrollFactor(0,0);
    this.active_bar_base.depth = 105;

    this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x000000 }});
    this.rect = new Phaser.Geom.Rectangle(9, 24, config.scene.game.config.width / 2 - 19, 6);
    this.graphics.strokeRectShape(this.rect);
    this.graphics.depth = 104;

    this.activeTxt = this.scene.add.bitmapText(
      14, 20,'bitmapFont','',36
    );
    this.activeTxt.visible = false; 
    this.activeTxt.setInteractive()
    this.activeTxt.setText(
      ['GO!']
    );
    this.activeTxt.depth = 106;

    this.speed = config.scene.player.active_time.speed * 0.1;
    this.per = 0;
    this.flg_per_max = false;


    this.active = false;

    this.store_power = 0;
    this.store_power_max = 10;

    this.timedEventActive;

  }
  update(keys, time, delta) {

    this.bar = this.bar + this.speed;

    if(this.bar >= this.barMax){
      this.bar = this.barMax;
      this.active = true;
    }else{
      this.active = false;
    }
    this.active_bar.displayWidth = this.active_bar.displayWidthMax * (this.bar / this.barMax);        
    // this.per = this.bar / this.barMax;

    if(this.active == true){
      this.per = this.store_power / this.store_power_max;

      this.activeTxt.visible = true; 

      if(this.store_power >= this.store_power_max){
        this.flg_per_max = true;
      }
      if(this.timedEventActive){
        return;
      }
      this.timedEventActive = this.scene.time.addEvent({
        delay: 300,
        callback: this.onEvent,
        callbackScope: this,
        repeat: -1,
        startAt: 1000
      });

    }else{
      if(this.timedEventActive){
        this.timedEventActive.remove(false);
        this.timedEventActive = null;
      }
      this.activeTxt.visible = false; 
      this.per = 0;
      this.store_power = 0;
      this.flg_per_max = false;
    }
  }
  onEvent(){
    if(this.store_power >= this.store_power_max){
      return;
    }
    this.store_power++;
  }

}
