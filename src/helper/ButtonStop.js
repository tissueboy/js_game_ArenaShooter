export default class ButtonStop extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key
    );

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setInteractive();

    let _scene = config.scene;

    this.depth = 101;

    this.on('pointerdown', () => {
      if(_scene.physics.world.isPaused){
        this.scene.anims.resumeAll();
        this.scene.physics.world.resume();    
        this.scene.createObjects.createObjTimerEvent.paused = false;
       
        this.scene.menu.container.setVisible(false); 
      }else{
        // _scene.events.emit('showUI');
        this.scene.anims.pauseAll();
        this.scene.physics.world.pause();
        this.scene.createObjects.createObjTimerEvent.paused = true;
        // _scene.scene.launch('UIScene');
        this.scene.menu.container.setVisible(true); 
      }
    },this);
  }
}
