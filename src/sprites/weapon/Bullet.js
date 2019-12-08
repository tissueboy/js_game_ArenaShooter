import Calcs from '../../helper/Calcs';

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame
    );
    this.power = 1;
    this.active = false;
    this.key = "bullet";

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    
    this.attackPoint = 0;

    this.speed = 100;
    this.active = false;

    this.calcs = new Calcs();

    this.vector_max_1 = {
      x: 0,
      y: 0
    };
    
    this.body.setGravity(0,0);
    this.breakTime = 1000;
    this.breakCounter = this.breakTime;

    // this.alive();
    this.canShot = false;
    
  }

  update(time, delta) {

    if(!this.active){
      this.body.setVelocity(0,0);
      return;
    }
    if(!this.canShot){
      return;
    }
    if(this.canShot){
      this.breakCounter -= delta;
    }

    if(this.breakCounter < 0){
      this.explode();      
    }

    this.body.setVelocity(
      this.vector_max_1.x*this.speed,
      this.vector_max_1.y*this.speed
    );
  }
  shot(param){
    this.canShot = true;
    
    this.setPosition(param.x,param.y);
    this.setActive(true);
    this.setVisible(true);
    this.breakCounter = this.breakTime;
    /*==============================
    受け取ったベクトルをMAXを1にしてvx*speedを均等にする。
    ==============================*/
    this.vector_max_1 = this.calcs.returnMax1(param.vx,param.vy);
  }

  alive(){
    this.setActive(false);
    this.setVisible(false);
    this.active = true;
  }

  explode() {
    this.setActive(false);
    this.setVisible(false);
    this.active = false;
    this.body.setVelocity(0,0);
    this.canShot = false;
    this.breakCounter = this.breakTime;
    // this.breakCounter = this.breakTime;
  }
  bounce(){

    if(!this.active){
      this.body.setVelocity(0,0);
      return false;
    }

    if(this.body.blocked.up || this.body.blocked.down){
      this.vector_max_1.y = this.vector_max_1.y * -1;
    }
    if(this.body.blocked.left || this.body.blocked.right){
      this.vector_max_1.x = this.vector_max_1.x * -1;
    }

    this.body.setVelocity(this.vector_max_1.x*this.speed,this.vector_max_1.y*this.speed);
  }
  // stop(){
  //   this.canShot = false;
  // }

}
