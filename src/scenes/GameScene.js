import Keypad from '../helper/Keypad';
import Keypad_PC from '../helper/Keypad_PC';
import CollisionCheck from '../helper/CollisionCheck';
import CreateObjects from '../helper/CreateObjects';
import ComboCount from '../helper/ComboCount';
import ClearStage from '../helper/ClearStage';
import ButtonStop from '../helper/ButtonStop';
import Animations from '../helper/Animations';
import PowerUpList from '../helper/PowerUpList';
import Menu from '../helper/Menu';

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

    console.log("this game scene",this);

    /*==============================
    ステージの表示
    ==============================*/
    this.stageNumber = this.registry.list.stage;
    this.map = this.make.tilemap({ key: 'map'+this.stageNumber,tileWidth: 16, tileHeight: 16});
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    this.groundLayer.setCollisionBetween(0, 2);
    this.groundLayer.setCollisionByProperty({ collides: true });
    // this.groundLayer.depth = 1;

    this.objectLayer = this.map.createDynamicLayer('object', this.tileset, 0, 0);
    this.objectLayer.setCollisionBetween(0, 2);
    this.objectLayer.setCollisionByProperty({ collides: true });
    // this.objectLayer.depth = 2;

    this.stageList = [
      // {
      //   stage: 1,
      //   boss: {
      //     class: Boss1,
      //     key: "boss1"
      //   }
      // },
      // {
      //   stage: 2,
      //   boss: {
      //     class: Boss2,
      //     key: "boss2"
      //   }
      // }
    ];

    this.player = new Player({
      scene: this,
      x: 40,
      y: 100,
      key: 'player'
    });
    // this.player.depth = 11;
    // if(!this.registry.list.weapon){
    //   this.registry.set('weapon', "bullet");
    // }
    // this.player.weapon = this.registry.list.weapon;

    // this.hasItemList = [
    //   // [Star, "star","item"]//デバッグ用
    // ];
    // if(this.registry.list.hasItemList){
    //   this.hasItemList = this.registry.list.hasItemList;
    // }


    /*==============================
    モンスターの生成
    ==============================*/
    this.createObjects = new CreateObjects({
      scene: this
    });

    // /*==============================
    // ボスの生成
    // ==============================*/
    // this.createBossTimerEvent = this.time.addEvent({
    //   delay: 5000,
    //   callback: this.createBoss,
    //   callbackScope: this,
    //   startAt: 0,
    // });

    /*==============================
    アニメーションの読み込み
    ==============================*/
    this.animations = new Animations({
      scene: this
    });

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
    // this.bulletEnemyGroup.children.entries.forEach(
    //   (sprite) => {
    //     sprite.update(time, delta);
    //   }
    // ); 

    this.enemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    // this.swordGroup.children.entries.forEach(
    //   (sprite) => {
    //     sprite.update(time, delta);
    //   }
    // );

    // this.itemGroup.children.entries.forEach(
    //   (sprite) => {
    //     sprite.update(time, delta);
    //   }
    // );
    
    // this.active_time.update(this.keypad.keys, time, delta);

  }

  // createBoss(){
  //   let _stageNumber = this.stageNumber;
  //   let bossObj = this.stageList.filter(function(item, index){
  //     if (item.stage == _stageNumber){
  //       return true;
  //     }
  //   });

  //   let boss = new bossObj[0].boss.class({
  //     scene: this,
  //     key: bossObj[0].boss.key,
  //     x: 100,
  //     y: 80,
  //     type: "boss"
  //   });
  //   boss.depth = 10;
  //   boss.appearEnemy(boss);

  //   this.enemyGroup.add(boss);

  //   this.createObjects.createObjTimerEvent.remove(false);
  //   this.createObjects.createObjTimerEvent = false;

  //   this.createBossTimerEvent.remove(false);
  //   this.createBossTimerEvent = null;

  // }
  // clearStageDisplay(){
  //   this.clearStageObj.container.visible = true;

  // }
  // pauseGame(){
  //   this.scene.pause('GameScene');
  // }
  // resumeGame(){
  //   this.scene.resume('GameScene');
  // }
  // refleshGame(){
  //   this.scene.start('GameScene');
  // }
}

export default GameScene;
