import Brain from '../sprites/character/enemy/Brain';
import Bad from '../sprites/character/enemy/Bad';

export default class ParseObjectLayers {
  constructor(config) {
    this.scene = config.scene;

    this.scene.physics.add.overlap(this.scene.player,this.scene.checkZoneGroup,this.zoneCheck, null, this);

    this.checkBossFlg = false;

  }
  addObject() {
    this.scene.map.getObjectLayer('enemy').objects.forEach(
      (enemy) => {
        let enemyObject;

        switch (enemy.name) {
          case 'brain':
            enemyObject = new Brain({
                scene: this.scene,
                key: 'brain',
                x: enemy.x,
                y: enemy.y
            });
            this.scene.enemyGroup.add(enemyObject);
            break;                      
            case 'bad':
              enemyObject = new Bad({
                  scene: this.scene,
                  key: 'bad',
                  x: enemy.x,
                  y: enemy.y
              });
              this.scene.enemyGroup.add(enemyObject);
              break;                      
            default:
            break;
        }
      }
    );
  }
  addCheck() {
    let _this = this;
    this.scene.map.getObjectLayer('check').objects.forEach(
      (object) => {
        // let object;
        let zone = _this.scene.add.zone(object.x, object.y).setSize(object.width, object.height);
        zone.name = object.name;
        _this.scene.checkZoneGroup.add(zone);
        _this.scene.physics.world.enable(zone);
        zone.body.setAllowGravity(false);
        // zone.body.debugBodyColor = 0x00ffff;
      }
    )
  }
  zoneCheck(player,obj){
    if(obj.name === "boss" && !this.checkBossFlg){

      this.checkBossFlg = true;

      this.scene.cameras.main.shake(500, 0.01, 0.01) //Duration, intensity, force

      this.scene.createBoss.createBoss();

    }
  }
}
