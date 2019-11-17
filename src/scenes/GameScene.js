import Keypad from '../helper/Keypad';
import Keypad_PC from '../helper/Keypad_PC';
import CollisionCheck from '../helper/CollisionCheck';
import CreateObjects from '../helper/CreateObjects';
import CreateBoss from '../helper/CreateBoss';
import ComboCount from '../helper/ComboCount';
import ClearStage from '../helper/ClearStage';
import GameOver from '../helper/GameOver';
import ButtonStop from '../helper/ButtonStop';
import Animations from '../helper/Animations';
import PowerUpList from '../helper/PowerUpList';
import Menu from '../helper/Menu';

import Star from '../sprites/item/Star';
import Portion from '../sprites/item/Portion';

// import Character from '../sprites/character/Character';
import Player from '../sprites/character/Player';
// import Boss1 from '../sprites/Character/boss/Boss1';


class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene'
    });
  }
  create(){

    /*==============================
    ステージの表示
    ==============================*/
    this.stageNumber = this.registry.list.stage;
    this.map = this.make.tilemap({ key: 'map'+this.stageNumber,tileWidth: 16, tileHeight: 16});
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    this.groundLayer.setCollisionBetween(0, 2);
    this.groundLayer.setCollisionByProperty({ collides: true });

    this.objectLayer = this.map.createDynamicLayer('object', this.tileset, 0, 0);
    this.objectLayer.setCollisionBetween(0, 2);
    this.objectLayer.setCollisionByProperty({ collides: true });


    this.hasItemList = [
      // [Star, "star","item"]//デバッグ用
      [Portion, "portion","item"]//デバッグ用
    ];
    if(this.registry.list.hasItemList){
      this.hasItemList = this.registry.list.hasItemList;
    }

    this.player = new Player({
      scene: this,
      x: 40,
      y: 100,
      key: 'player'
    });

    /*ラスボス*/
    this.shadow;




    /*==============================
    モンスターの生成
    ==============================*/
    this.createObjects = new CreateObjects({
      scene: this
    });

    /*==============================
    ボスの生成
    ==============================*/
    this.createBoss = new CreateBoss({
      scene: this
    });

    /*==============================
    アニメーションの読み込み
    ==============================*/
    this.animations;
    if(!this.animations){
      this.animations = new Animations({
        scene: this
      });
  
    }

    /*==============================
    キー入力
    ==============================*/
    this.keypad;
    if(this.registry.list.MODE === "PC"){
      this.keypad = new Keypad_PC({
        scene: this,
        key: 'keypad_pc',
        input: this.input
      });      
    }else{
      this.keypad = new Keypad({
        scene: this,
        key: 'keypad',
        input: this.input
      });            
    }

    /*==============================
    UI | POWER UP LIST
    ==============================*/
    this.powerUpList = new PowerUpList({
      scene: this
    });

    /*==============================
    UI | STOP BOTTON
    ==============================*/
    this.buttonStop = new ButtonStop({
      scene: this,
      x: 20,
      y: 20,
      key: 'button_stop'
    });

    /*==============================
    UI | メニュー
    ==============================*/

    this.menu = new Menu({
      scene: this
    });

    
    /*==============================
    UI | コンボカウンター
    ==============================*/
    this.combo = new ComboCount({
      scene: this,
      key: 'combo'
    });

    /*==============================
    UI | ステージクリア
    ==============================*/
    this.clearStageObj = new ClearStage({
      scene: this
    });

    /*==============================
    UI | ゲームオーバー
    ==============================*/
    this.gameOverObj = new GameOver({
      scene: this
    });

    /*==============================
    GROUP管理
    ==============================*/

    this.playerWeaponGroup = this.add.group();
    this.enemyWeaponGroup = this.add.group();
    
    this.enemyGroup = this.add.group();

    this.itemGroup = this.add.group();

    this.spellGroup = this.add.group();


    /*==============================
    衝突判定
    ==============================*/
    this.CollisionCheck = new CollisionCheck({
      scene: this
    });

    // this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        
  }
  update(time, delta) {

    this.keypad.update(this.input);

    if (this.physics.world.isPaused) {      
      return;
    }    

    this.player.update(this.keypad.keys, time, delta);

    this.playerWeaponGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    this.enemyWeaponGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    ); 

    this.enemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );

  }
  titleGame(){
    this.scene.start('TitleScene');
  }
  refleshGame(){
    this.scene.start('GameScene');
  }
}

export default GameScene;
