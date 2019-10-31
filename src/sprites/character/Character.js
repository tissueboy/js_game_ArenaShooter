import Calcs from '../../helper/Calcs';
import Hp from './Hp';
import Explode from './Explode';

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    /*==============================
    ヘルパー関数群を呼び出し
    ==============================*/    
    this.calcs = new Calcs();

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }
    this.active = true;
    this.invincible = false;
    this.type;
    
    this.hp = new Hp({
      scene: config.scene,
      key: 'hp',
      target: this,
      hp: this.status.hp
    });
    this.hp.active = true;

    this.damage_text = 0;
    this.damageText = this.scene.add.bitmapText(
      this.x,
      this.y,
      'bitmapFont',
      this.damage_text,
      30
    );

    this.damageText.setVisible(false);    

    this.isDamege = false;

    this.explodeSprite;

  }
  update(keys, time, delta) {
    if(!this.active){
      return;
    }
    if (this.active) {
      this.hp.move(this.x,this.y);
    }    
  }

  damage(num){

    if(this.invincible){
      return;
    }

    if(this.isDamege === true){
      return;
    }

    if(this.type !== "player"){
      this.scene.combo.hit();  
    }
    
    if(this.type === "player"){
      this.scene.powerUpList.addStep(-1);
    }
        
    let damage = num - this.status.defense;
    if(damage <= 0){
      damage = 1;
    }

    if(this.hp.active){
      this.hp.calc(damage*-1,this);
    }

    this.damageText.text = damage;
    this.damageText.x = this.x - this.body.halfWidth;
    this.damageText.y = this.y - this.height * 1.8;
    this.damageText.setVisible(true);

    var _damageText = this.damageText;
    var _damageText_x = this.damageText.x;
    var _damageText_y = this.y - this.height * 1.4;

    var damageTween = this.scene.tweens.add({
        targets: _damageText,
        y: _damageText_y,
        ease: 'liner',
        duration: 100,
        repeat: 0,
        completeDelay: 400,
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

    if (!this.hp.active) {
      this.hp.explode();
    }

    if (!this.active) {
      this.visible = false;
      this.explodeSprite = new Explode({
        scene: this.scene,
        key: "explosionAnime_m",
        x: this.x,
        y: this.y,
        target: this 
      });
      // this.explodeSprite.explode();
    }
  }
  explode(){

    this.active = false;  
    this.explodeSprite.destroy();
    // this.dropItem();
    this.destroy();
    
  }
}
