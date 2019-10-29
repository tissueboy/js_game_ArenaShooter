class TitleScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'TitleScene'
    });
    
  }
  create() {

    let config = {
      key: 'title',
      frames: [{
          frame: 'title',
      }]
    };

    this.title = this.add.bitmapText(
      this.scene.systems.game.config.width/2,
      80,
      'bitmapFont',
      '',
      50
    );
    this.title.setOrigin(0.5,0.5);
    this.title.depth = 100;
    // this.title.setText(
    //   ['MONSTER','DUNGEON']
    // );
    this.title.setText(
      ['ARENA','SHOOTER']
    );

    this.start_text_pc = this.add.bitmapText(
      this.scene.systems.game.config.width/2,
      160,
      'bitmapFont',
      '',
      30
    );
    this.start_text_pc.setOrigin(0.5,0.5);
    this.start_text_pc.setInteractive();
    this.start_text_pc.depth = 100;
    this.start_text_pc.getTextBounds(true);
    // this.start_text_pc.setText(
    //   ['ABCDEFGHIGKLM',
    //   'NOPQRSTUVWXYZ',
    //   'abcdefghijklm',
    //   'nopqrstuvwxyz',
    //   ' !"#$%&()*+,-./',
    //   '0123456789:;<=>?@'],
    // );
    this.start_text_pc.setText(
      ['PC MODE']
    );

    this.start_text_sph = this.add.bitmapText(
      this.scene.systems.game.config.width/2,
      200,
      'bitmapFont',
      '',
      30
    );
    this.start_text_sph.setOrigin(0.5,0.5);
    this.start_text_sph.depth = 100;
    this.start_text_sph.setInteractive();
    // this.start_text_sph.getTextBounds(true);
    this.start_text_sph.setText(
      ['SP MODE']
    );

    this.graphics = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0xff00ff, alpha: 1 } });


    this.start_text_pc.on('pointerdown', () => {
      this.registry.set('MODE', "PC");
      this.startGame();
    });  
    this.start_text_sph.on('pointerdown', () => {
      this.registry.set('MODE', "SPH");
      this.startGame();
    });
    this.registry.set('stage', "1");

  }
  startGame() {
    // this.scene.stop('GameScene');
    this.scene.start('GameScene');
  }
}

export default TitleScene;
