import Enemy from '../Enemy';
import Calcs from '../../../helper/Calcs';
import Bullet from '../../weapon/Bullet';

export default class Dragon extends Enemy {

  constructor(config) {

    super(config);

    this.type = "boss";
    this.key = "dragon";
    this.depth = 1;
    this._scene = config.scene;

    this.base_y = this.y;

    this.status = {
      hp: 20,
      power: 5,
      defense: 4,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }

    let _this = this;

    this.calc = new Calcs();

    this.shotDegree = 0;
    this.shotRadius = 0;

    this.flgShot = false;

    this.shotStartTimerEvent;
    this.shotTimerEvent;

    this.shotCount = 0;
    this.shotMaxCount = 10;

    this.setBullet = false;

  }
  update(keys, time, delta) {

    if (!this.active) {
      return;
    }

    let _this = this;
    let _time = time;


    if(!this.shotStartTimerEvent && this.active){
      this.shotStartTimerEvent = this.scene.time.delayedCall(
        2000,
        function(){
          this.attackSelect();
        },
        [],
        this
      );  
    }

    if(this.shotCount >= 10){
      this.shotCount = 0;
      this.shotStartTimerEvent.remove(false);
      this.shotStartTimerEvent = null;
      this.shotTimerEvent.remove(false);
      this.shotTimerEvent = null;
    }  

  
    if (this.active) {
      this.hp.move(this.x,this.y);
    }
  }
  attackSelect(){
    var rand = Math.floor( Math.random() * 100) ;
    if(rand <= 50){
      this.attack1();
    }else{
      this.attack2();
    }

  }
  attack1(){
    this.shotTimerEvent = this.scene.time.addEvent({
      delay: 200,
      duration: 500,
      startAt: 200,
      callback: function(){
        // this.setBullet = true;
        this.shotBullet();
        // this.shotCount++;
      },
      callbackScope: this,
      repeat: this.shotMaxCount,
      // loop: true
    });  
  }
  attack2(){
    console.log("attack2")
    this.shotTimerEvent = this.scene.time.addEvent({
      delay: 1000,
      duration: 1000,
      // startAt: 1000,
      callback: function(){
        // this.setBullet = true;
        this.dropShot();
        // this.shotCount++;
      },
      callbackScope: this,
      repeat: this.shotMaxCount,
      // loop: true
    });  
  }
  dropShot(){
    console.log("dropShot")
    let randomPos = this.createRandomPosition();
    console.log(randomPos)
    let drop = this.scene.add.sprite(randomPos.x, randomPos.y, 'barrier');
    let dropAnime = this.scene.tweens.add({
      targets: drop,
      ease: 'liner',
      // x: randomPos.x,
      y: randomPos.y + 40,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      repeat: 0,
      completeDelay: 200,
      onComplete: function () {
        console.log("comp drop");
        drop.destroy();
        // _this.appear();
      },
    });
    this.shotCount++;
  }
  createRandomPosition(){
    let min_x = 2;
    let max_x = 10;
    let min_y = 2;
    let max_y = 14;
    var randNumX = Math.floor(Math.random()*(max_x-min_x)+min_x);
    var randNumY = Math.floor(Math.random()*(max_y-min_y)+min_y);
    var randPos = {
      x: randNumX*16,
      y: randNumY*16
    };
    return randPos;  
  }
  shotBullet(){
    this.shotDegree += 36;
    this.shotRadian = this.shotDegree * ( Math.PI / 180 ) ;

    let _vx = Math.cos(this.shotRadian);
    let _vy = Math.sin(this.shotRadian);

    let vec = this.calcs.returnMax1(_vx,_vy);
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x+10,
      y: this.y+10,
      key: "bullet",
      vx: vec.x,
      vy: vec.y,
      target: this,
      power: 10,
      scale: 1,
      parent: "dragon"
    }); 
    this.scene.enemyWeaponGroup.add(bullet);
    this.shotCount++;
  }
}