import 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  // roundPixels: true,
  parent: 'content',
  width: 192,
  height: 320,
  physics: {
    default: 'arcade',
    arcade: {
      // fps: 30,
      debug: true,
      gravity: {
          y: 0
      },
      
    }
  },
  scene: [
    BootScene,
    TitleScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);        

