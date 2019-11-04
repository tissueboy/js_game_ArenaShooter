import Bad from '../sprites/character/enemy/Bad';
import Brain from '../sprites/character/enemy/Brain';
import Wizerd from '../sprites/character/enemy/Wizerd';
import Wizerd2 from '../sprites/character/enemy/Wizerd2';

export default class CreateObjects  extends Phaser.Time.TimerEvent{
  constructor(config) {

    super(
      config.scene,
    );

    this._scene = config.scene;

    this.createObjTimerEvent = config.scene.time.addEvent({
      delay: 3000,
      callback: this.createObj,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });

    this.min_x = 2;
    this.max_x = 10;
    this.min_y = 2;
    this.max_y = 14;
    this.max_enemy_length = 8;
    this.interval = 16;
    this.appear_max_length = 3;

    this.objListEnemy = [
      //stage 1
      [
        [Bad,"bad"],
        [Brain,"brain"]  
      ],
      //stage 2
      [
        [Wizerd,"wizerd"],
        [Wizerd2,"wizerd2"]  
      ]
    ];
  }
  getRandomObjName(arr){
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }

  createRandomPosition(){
    var randNumX = Math.floor(Math.random()*(this.max_x-this.min_x)+this.min_x);
    var randNumY = Math.floor(Math.random()*(this.max_y-this.min_y)+this.min_y);
    var randPos = [randNumX,randNumY];
    return randPos;  
  }

  createObj(){

    let appear_length = Math.floor(Math.random()*(this.appear_max_length-1)+1);

    if(this._scene.enemyGroup.getLength() >= this.max_enemy_length){
      return;
    }

    let _enemyList = this.objListEnemy[this._scene.stageNumber-1]


    for(var i = 0;i<appear_length;i++){

      let enemyName = this.getRandomObjName(_enemyList);

      var randomPostion = this.createRandomPosition();

      let enemyObject = new enemyName[0]({
        scene: this._scene,
        key: enemyName[1],
        x: randomPostion[0] * this.interval,
        y: randomPostion[1] * this.interval
      });
      this._scene.enemyGroup.add(enemyObject);
    }
  }
}
