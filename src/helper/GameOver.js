export default class GameOver extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.container = this.scene.add.container(0, 0);
    this.container.depth = 100;

    this.overlapArea = this.scene.add.graphics(
      {
        fillStyle: { color: 0x000000 }
      }
    );    
    this.rect = new Phaser.Geom.Rectangle(0, 0, config.scene.game.config.width, config.scene.game.config.height);
    this.overlapArea.fillRectShape(this.rect);
    this.overlapArea.alpha = 0.75;


    this.stageOverTxt = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      70,
      'bitmapFont',
      'GAME OVER',
      30
    );
    this.stageOverTxt.setOrigin(0.5,0.5);
    config.scene.physics.world.enable(this.stageOverTxt);
    config.scene.add.existing(this.stageOverTxt);

    this.buttonContinue = config.scene.add.sprite(
      config.scene.game.config.width/2,
      140,
      'button_continue'
    );
    this.buttonContinue.setOrigin(0.5,0.5);
    this.buttonContinue.setInteractive();
    config.scene.physics.world.enable(this.buttonContinue);
    config.scene.add.existing(this.buttonContinue);

    this.buttonTitle = config.scene.add.sprite(
      config.scene.game.config.width/2,
      200,
      'button_title'
    );
    this.buttonTitle.setOrigin(0.5,0.5);
    this.buttonTitle.setInteractive();
    config.scene.physics.world.enable(this.buttonTitle);
    config.scene.add.existing(this.buttonTitle);

    this.container.add([
      this.overlapArea,
      this.stageOverTxt,
      this.buttonContinue,
      this.buttonTitle
    ]);
    
    this.container.visible = false;

    this.buttonContinue.on('pointerdown', () => {
      console.log("buttonContinue");
      this.scene.refleshGame();

    });
    this.buttonTitle.on('pointerdown', () => {
      console.log("buttonTitle");
      this.scene.titleGame();
    });

  }

  gameOverDisplay(){
    this.container.visible = true;
  }
}
