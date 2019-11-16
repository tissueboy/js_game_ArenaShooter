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
      power: 8,
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
        enemy.damage(Math.floor(1 * this.status.power + this.barrier.power));
    },null,this);

    this.barrierDegree += 0.15;

    this.barrier.setVisible(true);
    this.barrier.x = this.x + Math.cos(this.barrierDegree)*this.barrierRadius;
    this.barrier.y = this.y + Math.sin(this.barrierDegree)*this.barrierRadius;


    if(keys.isTOUCH === true){
      this.barrier.scaleX = this.activeTime.per;
      this.barrier.scaleY = this.activeTime.per;

      this.activeTime.pileUp();
      // this.scope.head.setVisible(true);
      // this.scope.head.x = this.barrier.x + Math.cos(this.barrierDegree)*this.barrierRadius;
      // this.scope.head.y = this.barrier.y + Math.sin(this.barrierDegree)*this.barrierRadius;
      this.scope.playerShotLine.clear();
      // this.scope.head.vector = this.calcs.returnMax1(keys.VECTOR.x,keys.VECTOR.y);
      this.scope.playerShotLine.lineBetween(
        this.x,
        this.y,
        this.x + this.activeTime.per * Math.cos(this.barrierDegree)*this.barrierRadius,
        this.y + this.activeTime.per * Math.sin(this.barrierDegree)*this.barrierRadius
      );
    }else{
      this.barrier.scaleX = 0;
      this.barrier.scaleY = 0;
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
    let setScale = 1;
    let vec = this.calc.returnMax1(
      this.barrier.x - this.x,
      this.barrier.y - this.y
    );
    console.log("this.scene player",this.scene)
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
          _vx = Math.cos(radiusAfter);
          _vy = Math.sin(radiusAfter);    
        }
        if(i === 1){
          // _vx = this.attackVelocity.x;
          // _vy = this.attackVelocity.y;
          _vx = vec.x;
          _vy = vec.y;
          degreeAfter = degreeBase;
        }
        if(i === 2){
          degreeAfter = degreeBase - degreeAdd;
          radiusAfter = degreeAfter * ( Math.PI / 180 ) ;
          _vx = Math.cos(radiusAfter);
          _vy = Math.sin(radiusAfter);   
        }

        let bullet = new Bullet({
          scene: this.scene,
          x: this.barrier.x,
          y: this.barrier.y,
          key: "bullet",
          vx: _vx,
          vy: _vy,
          target: this,
          power: this.status.power,
          scale: setScale,
          parent: "player"
        }); 
        this.scene.playerWeaponGroup.add(bullet);  

      }
    }else{
      _vx = vec.x;
      _vy = vec.y;
      let bullet = new Bullet({
        scene: this.scene,
        x: this.barrier.x,
        y: this.barrier.y,
        key: "bullet",
        vx: _vx,
        vy: _vy,
        target: this,
        power: this.status.power ,
        scale: setScale,
        parent: "player"
      }); 
      this.scene.playerWeaponGroup.add(bullet);  
    }
  }
  starMode(){
    let _this = this;
    this.anims.play('playerStarAnime', true);
    this.invincible = true;
    this.starTimerEvent = this.scene.time.delayedCall(
      // delay: 0,
      2000,
      function(){
        _this.invincible = false;
        _this.anims.play('playerIdleAnime', true);
      },
      [],
      this);
  }
}
