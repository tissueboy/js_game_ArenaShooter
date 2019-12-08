import Character from './Character';
import ActiveTime from './ActiveTime';
import Bullet from '../weapon/Bullet';
import Calcs from '../../helper/Calcs';
import Scope from './Scope';

export default class Player extends Character{
  constructor(config) {
    super(config);

    this.status = {
      hp: 1000,
      power: 10,
      defense: 1,
      experience: 10,
      attackPoint: 3,
      level: 1
    }
    this.hp.hp = this.status.hp;
    this.hp.hpMax = this.status.hp;
    this.type = "player";

    this.activeTime = new ActiveTime({
      scene: config.scene,
      parent: this
    });
    
    this.playerRing = config.scene.add.sprite(this.x, this.y, 'player_ring');
    this.playerRing.setVisible(false);
    this.attackVelocity = new Phaser.Math.Vector2();

    let _this = this;

    this.activeTime.depth = 1;
    this.playerRing.depth = 2;
    this.depth = 3;
    this.activeTime.circle.setVisible(false);


    this.calc = new Calcs();

    this.scope = new Scope({
      scene: config.scene,
      target: this
    });

    /*==============================
    バリアー
    ==============================*/
    this.barrier = this.scene.add.sprite(this.x, this.y, 'barrier');
    this.barrier.radian;
    config.scene.physics.world.enable(this.barrier);
    config.scene.add.existing(this.barrier);

    this.barrier.setOrigin(0.5,0.5);
    this.barrier.setActive(true);
    this.barrier.setVisible(true);

    this.barrier.scaleX = 0;
    this.barrier.scaleY = 0;

    this.barrierDegree = 0;
    this.barrierRadius = 18;

    this.barrier.power = 1;

  }
  update(keys, time, delta) {
    /*==============================
    プレイヤーの移動
    ==============================*/
    if(this.active === false){
      return;
    }
    if(!this.scene.stageActive){
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

    this.scene.physics.overlap(this.scene.enemyGroup,this.barrier,
      function(enemy,barrier){
        if(!barrier.active){
          return;
        }
        enemy.damage(Math.floor(1 * this.status.power + this.barrier.power));
    },null,this);

    this.barrierDegree += 0.15;


    if(keys.isTOUCH === true){

      this.barrier.setVisible(true);
      this.barrier.setActive(true);
      this.barrier.x = this.x + Math.cos(this.barrierDegree)*this.barrierRadius;
      this.barrier.y = this.y + Math.sin(this.barrierDegree)*this.barrierRadius;

      
      this.barrier.scaleX = this.activeTime.per;
      this.barrier.scaleY = this.activeTime.per;

      this.activeTime.pileUp();
      this.scope.playerShotLine.clear();
      this.scope.playerShotLine.lineBetween(
        this.x,
        this.y,
        this.x + this.activeTime.per * Math.cos(this.barrierDegree)*this.barrierRadius,
        this.y + this.activeTime.per * Math.sin(this.barrierDegree)*this.barrierRadius
      );
    }else{
      this.barrier.scaleX = 0;
      this.barrier.scaleY = 0;
      this.barrier.setVisible(false);
      this.barrier.setActive(false);
      this.scope.head.setVisible(false);        
      this.scope.playerShotLine.clear();
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
    let bullet = {
      vx: 0,
      vy: 0
    };
    let setScale = 1;
    let vec = this.calc.returnMax1(
      this.barrier.x - this.x,
      this.barrier.y - this.y
    );
    let _vx = 0;
    let _vy = 0;
    if(this.status.level > 4){
      setScale = 2;
    }
    if(this.status.level > 2){
      let degreeAdd = 30;
      let degreeBase = Math.atan2(this.attackVelocity.y, this.attackVelocity.x)* 180 / Math.PI;
      
      let degreeAfter = 0;
      let radiusAfter = 0;      

      for(var i = 0; i < 3; i++){
        degreeAfter = 0;
        radiusAfter = 0;
        if(i === 0){
          degreeAfter = degreeBase + degreeAdd;
          radiusAfter = degreeAfter * ( Math.PI / 180 ) ;
          bullet.vx = Math.cos(radiusAfter);
          bullet.vy = Math.sin(radiusAfter);    
        }
        if(i === 1){
          bullet.vx = vec.x;
          bullet.vy = vec.y;
          degreeAfter = degreeBase;
        }
        if(i === 2){
          degreeAfter = degreeBase - degreeAdd;
          radiusAfter = degreeAfter * ( Math.PI / 180 ) ;
          bullet.vx = Math.cos(radiusAfter);
          bullet.vy = Math.sin(radiusAfter);   
        }
        this.fromShotPool(bullet);
      }
    }else{
      bullet.vx = vec.x;
      bullet.vy = vec.y;
      this.fromShotPool(bullet);
    }
  }
  starMode(){
    let _this = this;
    this.anims.play('playerStarAnime', true);
    this.invincible = true;
    this.starTimerEvent = this.scene.time.delayedCall(
      2000,
      function(){
        _this.invincible = false;
        _this.anims.play('playerIdleAnime', true);
      },
      [],
      this);
  }
  createShot(object){    
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "bullet"
    }); 
    this.scene.playerWeaponGroup.add(bullet);
  }
  fromShotPool(object){
    let bullet = this.scene.playerWeaponGroup.getFirst();
    if(!bullet){
      this.createShot();
      bullet = this.scene.playerWeaponGroup.get()
    }
    let param = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    }
    param.x = this.barrier.x;
    param.y = this.barrier.y;
    param.vx = object.vx;
    param.vy = object.vy;
    bullet.shot(param);
  }
}
