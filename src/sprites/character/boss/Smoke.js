import Enemy from '../Enemy';

export default class Smoke extends Enemy {

  constructor(config) {

    super(config);

    this.type = "boss";
    this.key = "stone";

    this.base_y = this.y;

    this.status = {
      hp: 20,
      power: 5,
      defense: 6,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }

    /*======
    弾の準備
    ========*/    
    this.smokeChildGroup = config.scene.add.group();
    let smokeChildLength = 7;

    for(var i = 0; i < smokeChildLength; i++){
      let smoleChildSprite = config.scene.add.sprite(this.x, this.y, 'smoke_s');
      config.scene.physics.world.enable(smoleChildSprite);
      config.scene.add.existing(smoleChildSprite);  
      smoleChildSprite.setOrigin(0.5,0.5);
      smoleChildSprite.setVisible(false);
      this.smokeChildGroup.add(smoleChildSprite);
    }
    this.attackStartTimerEvent;
    this.attackAppearTimerEvent;
  }
  update(){
    if (!this.active) {
      return;
    }
    if (this.active) {
      this.hp.move(this.x,this.y);
    }
    if(!this.attackAppearTimerEvent){
      let _this = this;
      this.attackAppearTimerEvent = this.scene.time.delayedCall(
        2000,
        function(){
          let moveAttackStart = this.scene.tweens.add({
            targets: this,
            ease: 'liner',
            x: 100,
            y: 40,
            duration: 1000,
            repeat: 0,
            onComplete: function () {
              _this.appearChildAnime();
            },
          });   
        },
        [],
        this
      );

  
    }
  }
  attack(){
  }
  appearChildAnime(sprite){
    let _this = this;
    let _delay = 1000;
    let _start_pos_x = 40;
    let _start_pos_y = 80;
    let _padding_side = 20;
    let _distance_height = 260;
    let _pos_x = 0;
    let _pos_y = 0;

    this.smokeChildGroup.children.entries.forEach(
      (sprite,index) => {

        _pos_x = _start_pos_x + _padding_side * index;
        if(index % 2 === 0){
          _pos_y = _start_pos_y
        }else{
          _pos_y = _distance_height;
        }

        sprite.x = _pos_x;
        sprite.y = _pos_y - 20;
        sprite.opacity = 0;
        sprite.scaleX = 0;
        sprite.scaleY = 0;
        sprite.setVisible(true);

        let appearAnime = _this.scene.tweens.add({
          targets: sprite,
          ease: 'liner',
          x: _pos_x,
          y: _pos_y,
          scaleX: 1,
          scaleY: 1,
          duration: 1000,
          delay: index * _delay,
          repeat: 0,
          onComplete: function () {
            console.log("child index",index);
            if(index === 6){
              _this.attackStartTimerEvent = _this.scene.time.delayedCall(
                2000,
                function(){
                  _this.appearChild();
                },
                [],
                _this
              );              
            }
          },
        }); 
      }
    );
  }
  appearChild(){
    let _this = this;
    let _top = -100;
    let _bottom = 500;
    let _pos_y = 0;
    this.smokeChildGroup.children.entries.forEach(
      (sprite,index) => {
        if(index % 2 === 0){
          _pos_y = _bottom;
        }else{
          _pos_y = _top;
        }
        let appearAttackAnime = _this.scene.tweens.add({
          targets: sprite,
          ease: 'liner',
          y: _pos_y,
          scaleX: 1,
          scaleY: 1,
          duration: 1800,
          repeat: 0,
          completeDelay: 2000,
          onComplete: function () {
            sprite.x = _this.x;
            sprite.y = _this.y;
            _this.attackAppearTimerEvent = null;
            sprite.setVisible(false);
          },
        }); 
      }
    );
  }

}