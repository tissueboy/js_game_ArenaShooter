import Axe from '../sprites/weapon/Axe';
import Star from '../sprites/item/Star';
import Portion from '../sprites/item/Portion';

export default class ClearStage extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.cursor = this.scene.add.sprite(10, 170, 'cursor');
    this.cursor.visible = false;
    this.cursor.depth = 110;
    this.visible = false;

    this.container = this.scene.add.container(0, 0);
    this.container.depth = 100;

    this.stageClearTxt = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      70,
      'bitmapFontYellow',
      'STAGE CLEAR',
      30
    );
    this.stageClearTxt.setOrigin(0.5,0.5);
    this.stageClearTxt.depth = 101;
    config.scene.physics.world.enable(this.stageClearTxt);
    config.scene.add.existing(this.stageClearTxt);

    this.getItemText = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      100,
      'bitmapFont',
      'GET ITEM',
      20
    );
    this.getItemText.depth = 101;
    this.getItemText.setOrigin(0.5,0.5);
    config.scene.physics.world.enable(this.getItemText);
    config.scene.add.existing(this.getItemText);

    this.btnNextText = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      200,
      'bitmapFont',
      'GO NEXT',
      20
    );
    this.btnNextText.setOrigin(0.5,0.5);
    this.btnNextText.depth = 101;
    this.btnNextText.setInteractive();
    config.scene.physics.world.enable(this.btnNextText);
    config.scene.add.existing(this.btnNextText);

    this.dropItemList = [
      [Axe, "axe","weapon"],
      [Portion, "portion","item"],
      [Star, "star","item"]
    ];

    this.container.add(this.stageClearTxt);
    this.container.add(this.getItemText);
    this.container.add(this.btnNextText);
    this.container.visible = false;

    // this.getItemGroup = this.scene.add.group();

    this.getItem;

    this.dropItem();

  }
  getRandomObjName(arr){
    let random = Math.floor(Math.random() * arr.length);
    let randomName = arr[random];
    this.dropItemList.splice(random, 1);
    return randomName;
  }
  dropItem(){
    for(var i = 0; i < 3;i++){
      let dropItemName = this.getRandomObjName(this.dropItemList);
      let type = dropItemName[2];
      let sprite = this.scene.add.sprite(30*(i+1)+40, 170, dropItemName[1]);
      sprite.depth = 10;
      sprite.setInteractive();
      // this.getItemGroup.add(sprite);
      this.container.add(sprite);
      sprite.itemList = dropItemName;
      sprite.on('pointerdown', () => {
        this.cursor.visible = true;
        this.cursor.x = sprite.x;
        this.cursor.y = sprite.y;
        this.getItem = sprite.itemList;

      },this);
    }

    this.btnNextText.on('pointerdown', () => {
      this.scene.registry.set('stage', "2");
      this.scene.registry.set('coin', this.scene.coin_count);
      if(this.getItem){
        if(this.getItem[2] == "weapon"){
          this.scene.registry.set('weapon', this.getItem[1]);
        }else{
          this.scene.hasItemList.push(this.getItem)
        }
  
      }
      this.scene.registry.set('hasItemList', this.scene.hasItemList);
      this.scene.refleshGame();
    });


  } 
}
