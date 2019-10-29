import BossHp from './BossHp';

export default class Boss extends Phaser.Physics.Arcade.Sprite {

  constructor(config) {

    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setImmovable(true);/*ぶつかっても影響を受けない*/

    this.isDamege = false;

    this._scene = config.scene;

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }
    this.hp;

    this.damage_text = 0;

    this.damageText = this.scene.add.text(this.x, this.y, this.damage_text, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
      style:{
      }
    });

    this.damageText.setVisible(false);
    this.damageText.depth = 14;

    this.direction = {
      x: 0,
      y: 0
    }

    this.chasingPlayerTimerEvent;
    this.shootingPlayerTimerEvent;

    this.MONSTER_SPEED = 1;
    this.MONSTER_HIT_DELAY = 100;
    this.CHASING_DISTANCE = 60;
    this.isStartled = false;

    /*==============================
    表示までOFF
    ==============================*/
    this.active = false;
    this.damageText.visible = false;
    this.visible = false;
    this.delayActiveTimerEvent;

    /*==============================
    表示までのアニメーション
    ==============================*/
    this.circle = new Phaser.Geom.Circle(this.x, this.y, 10);//x,y.size
    this.appearCircle = this.scene.add.graphics({ fillStyle: { color: 0xFF0000 } });
    this.appearCircle.fillCircleShape(this.circle);
    this.appearCircle.depth = 1;
    this.delayActiveTimerEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.appearEnemy,
      callbackScope: this
    });
  }

  update(keys, time, delta) {
    if (!this.active) {
      return;
    }
    this.handleChase();
    this.hp.move(this.x,this.y);

  }
  handleChase() {
    if (!this.chasingPlayerTimerEvent && this.shouldChase()) {
      this.startChasing();
      this.startShooting();
      return;
    }

    if (this.chasingPlayerTimerEvent && !this.shouldChase()) {
      this.stopChasing();
      this.stopShooting();
    }
  }
  shouldChase() {
    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    const distance = monsterPoint.distance(playerPoint);

    if (distance < this.CHASING_DISTANCE) {
      return true;
    }

    if (this.isStartled) {
      return true;
    }

    return false;
  }
  startChasing() {
    this.chasingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 500,
      callback: this.moveTowardsPlayer,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });
  }
  stopChasing() {
    if (this.active) {
      this.stopRunning();
    }
    // this.chasingPlayerTimerEvent.destroy();
    this.chasingPlayerTimerEvent = null;
  }
  moveTowardsPlayer() {
    if (!this.active) {
      return;
    }

    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    var { x,y } = playerPoint.subtract(monsterPoint);

    var rangeRadius = 10;
    var radian = Math.atan2(x, y);
    x = rangeRadius * Math.sin(radian);
    y = rangeRadius * Math.cos(radian);

    this.direction.x = x;
    this.direction.y = y;

    this.run(x, y);

  }
  run(x, y) {

    if (x === 0 && y === 0) {
      return;
    }

    if (!this.active) {
      return;
    }

    this.setVelocityX(x * this.MONSTER_SPEED);
    this.setVelocityY(y * this.MONSTER_SPEED);

  }
  stopRunning() {
    if (!this.active) {
      return;
    }

    this.setVelocity(0);
    // this.beIdle();
  }
  startShooting() {
    this.shootingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.bullet,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });
  }
  stopShooting() {
    if (!this.active) {
      return;
    }
    if (this.active) {
      this.stopRunning();
    }
    // this.shootingPlayerTimerEvent.destroy();
    this.shootingPlayerTimerEvent.remove(false);
    this.shootingPlayerTimerEvent = null;
    this.direction.x = 0;
    this.direction.y = 0;
  }
  bullet(){
    if (!this.active) {
      return;
    }
    var radian = Math.atan2(this.direction.x, this.direction.y);
    var rangeRadius = 10;
    var direction_x = rangeRadius * Math.sin(radian);
    var direction_y = rangeRadius * Math.cos(radian);

    var bullet = new Bullet({
      scene: this.scene,
      key: 'bullet',
      x: this.x,
      y: this.y,
      vx: direction_x,
      vy: direction_y,
      target: this,
      power: 0,
      scale: 1,
      type: "enemy"
    });
    this.scene.bulletEnemyGroup.add(bullet);   
    this.countTouch++; 
  }
  damage(num){

    let damage = num - this.status.defense;
    if(damage <= 0){
      damage = 1;
    }
    this.hp.calc(damage*-1,this);

    if (!this.active) {
      return;
    }

    this.damageText.text = damage;
    this.damageText.x = this.x - this.body.halfWidth;
    this.damageText.y = this.y - this.height * 1.0;
    this.damageText.setVisible(true);

    var _damageText = this.damageText;
    var _damageText_x = this.damageText.x;
    var _damageText_y = this.damageText.y - this.height * 0.6;

    var damageTween = this.scene.tweens.add({
        targets: _damageText,
        y: _damageText_y,
        ease: 'liner',
        duration: 200,
        repeat: 0,
        onComplete: function () {
          _damageText.setVisible(false);
        },
    });

    this.isDamege = true;

    var enemy = this;
    var enemyDamageTween = this.scene.tweens.add({
      targets: this,
      alpha: 0.2,
      duration: 200,
      loop: 10,
    });
    var stop = function(){
      enemyDamageTween.stop();
      enemy.alpha = 1;
      enemy.isDamege = false;
    }
    setTimeout(stop, 600);

  }
  getExperience(){
    this.scene.experience = this.scene.experience + this.status.experience;
  }
  explode(){
    this.active = false;
    this.destroy();
  }
  appearEnemy(){
    this.active = true;
    this.visible = true; 
    this.delayActiveTimerEvent.remove(false);
    this.delayActiveTimerEvent = null;
    this.hp = new BossHp({
      scene: this._scene,
      key: 'hp',
      target: this,
      hp: this.status.hp
    });
    this.appearCircle.destroy();
  }

}