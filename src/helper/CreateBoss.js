import Stone from '../sprites/character/boss/Stone';
import Robot from '../sprites/character/boss/Robot';
import Sun from '../sprites/character/boss/Sun';
import Smoke from '../sprites/character/boss/Smoke';
import Dragon from '../sprites/character/boss/Dragon';
import Shadow from '../sprites/character/boss/Shadow';

export default class CreateBoss  extends Phaser.Time.TimerEvent{
  constructor(config) {

    super(
      config.scene,
    );

    this._scene = config.scene;

    this.stageNumber = config.scene.stageNumber;

    this.stageList = [
      {
        stage: 1,
        boss: {
          object: Dragon,
          x: config.scene.game.config.width/2,
          y: 80,
          key: 'dragon'
        }
      },
      {
        stage: 6,
        boss: {
          object: Shadow,
          x: config.scene.game.config.width/2,
          y: 80,
          key: 'shadow'
        }
      },
      {
        stage: 5,
        boss: {
          object: Stone,
          x: config.scene.game.config.width/2,
          y: 80,
          key: 'stone'
        }
      },
      {
        stage: 2,
        boss: {
          object: Sun,
          x: config.scene.game.config.width/2,
          y: config.scene.game.config.height/2,
          key: 'sun'
        }
      },
      {
        stage: 3,
        boss: {
          object: Smoke,
          x: config.scene.game.config.width/2,
          y: 80,
          key: 'smoke'
        }
      },
      {
        stage: 4,
        boss: {
          object: Robot,
          x: config.scene.game.config.width/2,
          y: 80,
          key: 'robot_base'
        }
      }
    ];
    this.createBossTimerEvent = config.scene.time.addEvent({
      delay: 100,
      callback: this.createBoss,
      callbackScope: config.scene,
      startAt: 0,
    });
  }


  createBoss(){
    let _stageNumber = this.createBoss.stageNumber;
    let bossObj = this.createBoss.stageList.filter(function(item, index){
      if (item.stage == _stageNumber){
        return true;
      }
    });

    let _x = bossObj[0].boss.x;
    let _y = bossObj[0].boss.y;

    let boss = new bossObj[0].boss.object({
      scene: this,
      x: _x,
      y: _y,
      key: bossObj[0].boss.key
    });

    this.enemyGroup.add(boss);
    this.createObjects.createObjTimerEvent.remove(false);
    // this.createObjects.createObjTimerEvent = false;

    this.createBoss.createBossTimerEvent.remove(false);
    // this.createBossTimerEvent = null;
  }
  clearStageDisplay(){
    this.clearStageObj.container.visible = true;
  }


}
