import 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

let BASE_WIDTH = 192;
let DEVICE_WIDTH = window.innerWidth;
let DEVICE_HEIGHT = window.innerHeight;
let wd = BASE_WIDTH/DEVICE_WIDTH;
let hi = DEVICE_HEIGHT * wd;
console.log("DEVICE_WIDTH",DEVICE_WIDTH)
console.log("DEVICE_HEIGHT",DEVICE_HEIGHT)
const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  // roundPixels: true,
  parent: 'content',
  width: BASE_WIDTH,
  height: hi,
  physics: {
    default: 'arcade',
    arcade: {
      fps: 30,
      // debug: true,
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

