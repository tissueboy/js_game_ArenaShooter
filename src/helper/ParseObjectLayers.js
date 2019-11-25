import Brain from '../sprites/character/enemy/Brain';
import Bad from '../sprites/character/enemy/Bad';

export default class ParseObjectLayers {
  constructor(config) {
    this.scene = config.scene;
    // console.log("ParseObjectLayers");
  }
  addObject() {
    console.log("this.scene.map",this.scene.map.getObjectLayer('enemy').objects);
    // let _this = this._scene;
    // let _this2 = this;
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
            // console.error('Unknown:', enemy.name); // eslint-disable-line no-console
            break;
        }
      }
    );
  }
}
