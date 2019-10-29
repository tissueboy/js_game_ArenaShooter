import Item from './Item';
import FireArea from './FireArea';

export default class Fire extends Item {
  constructor(config) {
    super(config);
    // this.recoveryPoint = 1;
    this.scene = config.scene;
    this.throwed = false;
    this.speed = 10;
    this.hitCount = 0;
    this.count = 0;
    this.attackPoint = 10;

    this.areaTimer;

    this.attack_once = false;

    /*==============================
    デバッグ
    ==============================*/
    this.debugText = this.scene.add.text(20, 20, '', { font: '8px Courier', fill: '#ff0000' });
    this.debugText.depth = 100;
    this.debugText.setScrollFactor(0,0);

  }

  update(){
    if(this.scene.player.attach === this){

      this.x = this.scene.player.x;
      this.y = this.scene.player.y;
      this.depth = 20;

    }
  }
  hit(player,obj){
    if(this.hitCount > 0){
      return;
    }
    this.hitCount++;
    if(this.scene.player.attached){
      return;
    }else{
      this.scene.player.attached = true;      
      this.scene.player.attach = this;
    }
  }
  throwItem(param){
    this.throwed = true;
    this.body.setVelocity(param.vx*this.speed,param.vy*this.speed);
  }
  checkCollision(item,obj){

    if(this.attack_once){
      return;
    }

    let target = {
      x: 0,
      y: 0
    }

    if(this.throwed === true){
      if(obj.type === "enemy"){
        target.x = obj.x;
        target.y = obj.y;
      }else{
        target.x = item.x;
        target.y = item.y;
      }
      let radius = 46;

      this.scene.enemyGroup.children.entries.forEach(
        (sprite) => {
          if(radius*radius >= (sprite.x - target.x)*(sprite.x - target.x) + (sprite.y - target.y)*(sprite.y - target.y)){
            if(sprite.active){
              sprite.damage(item.attackPoint);
            }
          }
        }
      );
      let area = new FireArea({
        scene: this.scene,
        x: target.x,
        y: target.y,
        key: 'fire_area'
      });
      area.depth = 2;
      this.scene.spellGroup.add(area);


      let areaTimer2 = this.scene.time.delayedCall(
        1000,
        function(){
          // area.clear();
          this.scene.spellGroup.children.entries.forEach(
            (sprite) => {
              sprite.destroy();
          });
          this.scene.itemGroup.children.entries.forEach(
            (sprite) => {
              sprite.hitCount = 0;
          });
          this.scene.combo.combo_count = 0;
          this.destroy();
        },
        [],
        this
      ); 

      this.throwed = false;
      this.attack_once = true;
      this.visible = false;

    }else{
      return;
    }
  }
  area_x_enemy_Collision(area,enemy){
    enemy.alpha = 0.4;

  }

}