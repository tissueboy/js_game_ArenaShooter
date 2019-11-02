import Robot from '../sprites/character/boss/Robot';

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
          object: Robot,
          x: config.scene.game.config.width/2,
          y: 80
        }
      },
      {
        stage: 2,
        boss: {
          object: Robot,
          x: config.scene.game.config.width/2,
          y: 80
        }
      }
    ];
    this.createBossTimerEvent = config.scene.time.addEvent({
      delay: 5000,
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
      key: 'robot_base'
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
