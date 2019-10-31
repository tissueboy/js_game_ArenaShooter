import Calcs from '../../helper/Calcs';

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.vx,
      config.vy,
      config.target,
      config.power,
      config.scale,
      config.type,
      config.effects
    );
    this.power = 1;
    this.attribute = "weapon";

    this.type = config.type;
    this._scene = config.scene;

  
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);


    this.target = config.target;
    
    this.attackPoint = Math.floor(1 * this.target.status.power + this.power);

    this.speed = 100;
    this.depth = 10;

    this.vx = config.vx;
    this.vy = config.vy;

    /*==============================
    受け取ったベクトルをMAXを1にしてvx*speedを均等にする。
    ==============================*/
    this.calcs = new Calcs();

    this.vector_max_1 = this.calcs.returnMax1(this.vx,this.vy);
    
    this.body.setGravity(0,0);
    this.body.setVelocity(
      this.vector_max_1.x*this.speed,
      this.vector_max_1.y*this.speed
    );   

    this.breakTime = 1600;

    this.breakTimerEvent;

    this.scaleX = this.scaleX * config.scale;
    this.scaleY = this.scaleY * config.scale;

  }

  update(time, delta) {

    this.breakTime -= delta;
    if(this.breakTime < 0){
      this.explode();
    }
  }

  collided(bullet,layer) {

  }

  explode() {
    if(this.type === "player"){
    }
    this.scene.playerWeaponGroup.remove(this);
    this.scene.enemyWeaponGroup.remove(this);
    this.destroy();
  }
  bounce(){

    if(this.body.blocked.up || this.body.blocked.down){
      this.vector_max_1.y = this.vector_max_1.y * -1;
    }
    if(this.body.blocked.left || this.body.blocked.right){
      this.vector_max_1.x = this.vector_max_1.x * -1;
    }

    this.body.setVelocity(this.vector_max_1.x*this.speed,this.vector_max_1.y*this.speed);
  }
}
