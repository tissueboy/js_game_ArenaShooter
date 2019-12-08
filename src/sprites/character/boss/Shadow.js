import Enemy from '../Enemy';
import Calcs from '../../../helper/Calcs';
import Bullet from '../../weapon/Bullet';

export default class Shadow extends Enemy {

  constructor(config) {

    super(config);

    this.type = "boss";
    this.key = "shadow";
    this.depth = 1;

    this.base_y = this.y;

    this.status = {
      hp: 100020,
      power: 5,
      defense: 10000000,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }

    let _this = this;

    this.attackDegree = 0;

    this.calc = new Calcs();

    this.canAttack = false;

    this.shadowAttack = config.scene.add.group({
      // classType: Bullet,
      // maxSize: 50,
      runChildUpdate: true 
    });
    this.attackDirection = ["left", "right", "bottom"];

    this.shotMaxCount = 10;
    this.shotCount = 0;
    this.shotTimerEvent;

    config.scene.physics.add.overlap(this.shadowAttack,config.scene.player,this.bullet_x_player_Collision);
    config.scene.physics.add.overlap(this.shadowAttack,config.scene.playerWeaponGroup,this.bullet_x_playerWeapon_Collision);

    this.scene.time.addEvent({ delay: 10, callback: function(){this.canAttack = true;}, callbackScope: this });

    this.shotAllTimerEvent;

    this.attackMode = "";

  }
  bullet_x_player_Collision(bullet,player){
    if(!bullet.active){
      return;
    }
    player.damage(bullet.attackPoint);
    bullet.explode();

  }
  bullet_x_playerWeapon_Collision(bullet,playerWeapon){
    bullet.explode();
  }
  update(keys, time, delta) {


    if (!this.active) {
      return;
    }

    if (this.active) {
      this.hp.move(this.x,this.y);
    }
    

    if(this.canAttack){
      this.canAttack = false;
      this.scene.time.addEvent({ delay: 5000, callback: this.hideAttack, callbackScope: this });
      // let fireball = this.shadowAttack.get();
      // if (fireball)
      // {
      //   fireball.setVisible(true);
      // }
      this.attackSelect();
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
    console.log("attack1");
    this.attackMode = "attack1";
    if(!this.active){
      return;
    }
    let direction = this.attackDirection[Math.floor(Math.random() * this.attackDirection.length)];
    this.shotTimerEvent = this.scene.time.addEvent({
      delay: 200,
      duration: 100,
      startAt: 200,
      callback: function(){
        this.shotBullet(direction);
        this.shotCount++;
      },
      callbackScope: this,
      repeat: this.shotMaxCount
    });
  }
  hideAttack(){
    console.log("hideAttack")
    this.canAttack = true;
    this.shotCount = 0;
    this.attackDegree = 0;
    if(this.shotStartTimerEvent){
      this.shotStartTimerEvent = null;
      this.shotTimerEvent.remove(false);  
    }
    // this.shotTimerEvent.remove(false)
  }
  attack2(){
    console.log("attack2");
    this.attackMode = "attack2";

    let playerPosition = this.scene.player.getCenter();

    console.log("playerPosition",playerPosition)

    this.shotTimerEvent = this.scene.time.addEvent({
      delay: 100,
      duration: 100,
      startAt: 100,
      callback: function(){
        this.shotCount++;
        this.arroundBullet(playerPosition);
        console.log("this.shotCount____",this.shotCount)
      },
      callbackScope: this,
      repeat: this.shotMaxCount
    });
  }
  arroundBullet(playerPosition){
    this.attackDegree += 32;
    let degree = this.attackDegree * ( Math.PI / 180 );
    let radius = 50;
    let add_x = radius * Math.sin(degree);
    let add_y = radius * Math.cos(degree);
    let playerPoint = this.scene.player.getCenter();
    // let playerPoint = playerPosition;
    console.log("playerPosition.x:"+playerPosition.x+"/playerPosition.y:"+playerPosition.y);
    console.log("playerPoint   .x:"+playerPoint.x   +"/playerPoint   .y:"+playerPosition.y);
    console.log("this.scene.pla.x:"+this.scene.player.x+"/this.scene.pla.y:"+this.scene.player.y);
    let bulletPoint = {
      x: playerPosition.x + add_x,
      y: playerPosition.y + add_y
      // x: playerPoint.x + add_x,
      // y: playerPoint.y + add_y
    }

    var vecter = playerPoint.subtract(bulletPoint);

    var rangeRadius = 1;
    var radian = Math.atan2(vecter.x, vecter.y);
    let _vx = Math.sin(radian);
    let _vy = Math.cos(radian);

    let bullet = {
      x: playerPosition.x + add_x,
      y: playerPosition.y + add_y,
      // x: playerPoint.x + add_x,
      // y: playerPoint.y + add_y,
      vx: _vx,
      vy: _vy
    }
    this.fromShotPool(bullet);


  }
  shotBullet(direction){
    let bullet;
    if(direction === "bottom"){
      bullet = {
        x: this.shotCount * 16,
        y: this.y + this.height/2,
        vx: 0,
        vy: 5
      }  
    }
    if(direction === "left"){
      bullet = {
        x: 16,
        y: this.y + this.height/2 + this.shotCount * 16,
        vx: 5,
        vy: 0
      }  
    }
    if(direction === "right"){
      bullet = {
        x: this.scene.game.config.width - 16,
        y: this.y + this.height/2 + this.shotCount * 16,
        vx: -5,
        vy: 0
      }  
    }

    this.fromShotPool(bullet);
  }
  createShot(object){    
    let bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: "shadow_shot"
    }); 
    this.shadowAttack.add(bullet);
  }
  fromShotPool(object){
    let bullet = this.shadowAttack.getFirst();
    if(!bullet){
      this.createShot();
      bullet = this.shadowAttack.get()
    }
    let param = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      scale: 0,
      power: 0,
      
    }
    param.x = object.x;
    param.y = object.y;
    param.vx = object.vx;
    param.vy = object.vy;

    bullet.x = object.x;
    bullet.y = object.y;
    bullet.vx = object.vx;
    bullet.vy = object.vy;

    if(this.attackMode === "attack1"){
      bullet.shot(param);
    }
    if(this.attackMode === "attack2"){
      // bullet.shot(param);
      bullet.setActive(true);
      bullet.setVisible(true);
      this.scene.time.delayedCall(
        (this.shotMaxCount - this.shotCount + 8) * 200,
        function(){
          bullet.shot(param);
        },
        [],
        this
      );  
    }
    // if(this.shotMaxCount < this.shotCount && !this.shotAllTimerEvent){
    //   console.log("this.shotCount",this.shotCount);
    //   console.log("this.shotMaxCount",this.shotMaxCount);
    //   console.log("maxmax callback")
    //   this.shotCount = 0;
    //   this.shotAllTimerEvent = this.scene.time.addEvent({
    //     delay: 2000,
    //     callback: function(){
    //       console.log("callback")
    //       this.shadowAttack.children.entries.forEach(
    //         (bullet,index) => {
    //           // console.log("bullet",bullet)
    //           let param = {
    //             x: bullet.x,
    //             y: bullet.y,
    //             vx: bullet.vx,
    //             vy: bullet.vy,
    //             scale: 0,
    //             power: 0
    //           }
    //           console.log("param_index"+":"+index+"=")
    //           console.log("param",param)
    //           bullet.shot(param);
    //         }
    //       );
    //       this.shotAllTimerEvent.remove(false);
    //       this.shotAllTimerEvent = null;
          
    //     },
    //     callbackScope: this
    //   });     
    // }
  }
}