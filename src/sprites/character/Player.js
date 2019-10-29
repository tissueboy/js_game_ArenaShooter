import Character from './Character';
import ActiveTime from './ActiveTime';
import Bullet from '../weapon/Bullet';

export default class Player extends Character{
  constructor(config) {
    super(config);

    this.status = {
      hp: 10,
      power: 10,
      defense: 1,
      experience: 10,
      attackPoint: 2,
      level: 1
    }

    this.type = "player";

    this.activeTime = new ActiveTime({
      scene: config.scene,
      parent: this
    });
    
    this.playerRing = config.scene.add.sprite(this.x, this.y, 'player_ring');
    this.attackVelocity = new Phaser.Math.Vector2();

    this.activeTime.depth = 1;
    this.playerRing.depth = 2;
    this.depth = 3;

  }
  update(keys, time, delta) {
    /*==============================
    プレイヤーの移動
    ==============================*/
    if(this.active === false){
      return;
    }
    this.setVelocityX(keys.DIRECTION.x*4);
    this.setVelocityY(keys.DIRECTION.y*4);
    if (this.active) {
      this.hp.move(this.x,this.y);
      this.playerRing.x = this.x;
      this.playerRing.y = this.y;
      this.activeTime.move(this.x,this.y);
      var radian = Math.atan2(keys.VECTOR.x, keys.VECTOR.y);
      var degree = radian *  180 / Math.PI *-1;
      this.playerRing.angle = degree;
    }  
    if(keys.isTOUCH === true){
      this.activeTime.pileUp();
    }

    if(keys.isRELEASE === true){
      if(this.activeTime.flg_max === true){
        this.attackVelocity = keys.VECTOR;
        this.attack();
      }
      this.activeTime.pileReset(); 
    }
  }
  attack(){
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "bullet",
      vx: this.attackVelocity.x,
      vy: this.attackVelocity.y,
      target: this,
      power: this.status.power ,
      scale: 1,
      parent: "player"
    }); 
    bullet.depth = 10;  
    this.scene.playerWeaponGroup.add(bullet);
  }
}
