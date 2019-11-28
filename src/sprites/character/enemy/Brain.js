import EnemyChase from './EnemyChase';
import Bullet from '../../weapon/Bullet';

export default class Brain extends EnemyChase {

  constructor(config) {

    super(config);

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }
    this.hp.hp = this.status.hp;
    this.hp.hpMax = this.status.hp;

    this.CHASING_DISTANCE = 160;
    this.ATTACKING_DISTANCE = 100;    
    this.attackingTimerEvent;

  }

  update(keys, time, delta) {
    if (!this.active) {
      return;
    }
    this.handleChase();
    this.hp.move(this.x,this.y);

  }
  attack(){
    if (!this.active) {
      return;
    }

    if(this.attackingTimerEvent){
      return;
    }else{
      this.attackingTimerEvent = this.scene.time.addEvent({
        delay: 3000,
        callback: function(){
          this.attackingTimerEvent.remove(false);
          this.attackingTimerEvent = null;
        },
        callbackScope: this,
        repeat: 0
      });  
    }
    var radian = Math.atan2(this.direction.x, this.direction.y);
    var rangeRadius = 10;
    var direction_x = rangeRadius * Math.sin(radian);
    var direction_y = rangeRadius * Math.cos(radian);


    let bullet = {
      vx: direction_x,
      vy: direction_y
    }
    // bullet.vx = direction_x;
    // bullet.vx = direction_x;

    this.fromShotPool(bullet);

    // var bullet = new Bullet({
    //   scene: this.scene,
    //   key: 'bullet',
    //   x: this.x,
    //   y: this.y,
    //   vx: direction_x,
    //   vy: direction_y,
    //   target: this,
    //   power: 0,
    //   scale: 1,
    //   type: "enemy"
    // });
    // this.scene.enemyWeaponGroup.add(bullet);   
  }
  createShot(object){    
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "bullet"
    }); 
    this.scene.enemyWeaponGroup.add(bullet);
  }
  fromShotPool(object){
    let bullet = this.scene.enemyWeaponGroup.getFirst();
    if(!bullet){
      this.createShot();
      bullet = this.scene.enemyWeaponGroup.get()
    }
    let param = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      scale: 0,
      power: 0
    }
    param.x = this.x;
    param.y = this.y;
    param.vx = object.vx;
    param.vy = object.vy;
    bullet.shot(param);
  }
  attackStop(){
    
  }

}