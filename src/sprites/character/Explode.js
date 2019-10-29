export default class Explode extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.target
    );

    config.scene.add.existing(this);

    this.depth = 10;

    // config.scene.anims.create({
    //   key: 'explosionAnime_m',
    //   frames: config.scene.anims.generateFrameNumbers('explode_m', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: 0
    // });
    this.anims.play('explosionAnime_m', true);
    
    this.on('animationcomplete', function() {
      config.target.explode();
    },this);

  }

  update(time, delta) {

  }
  explode(){
    
  }
}
