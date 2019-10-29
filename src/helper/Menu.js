import Star from '../sprites/item/Star';
import Portion from '../sprites/item/Portion';
export default class Menu extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key
    );
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setInteractive();
    this._scene = this.scene;
    this.cursor = this.scene.add.sprite(10, 170, 'cursor');
    this.cursor.visible = false;
    this.cursor.depth = 110;

    this.togglePlay = true;
    this.container = this.scene.add.container(0, 0);
    this.container.depth = 100;
    this.container.visible = false;

    this.btnUseText = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      200,
      'bitmapFont',
      'USE ITEM',
      30
    );
    this.selectItem;
    this.selectItemIndex;
    this.btnUseText.visible = false;
    this.btnUseText.depth = 110;
    this.btnUseText.setInteractive();
    this.btnUseText.setOrigin(0.5,0.5);
    let _this = this;
    this.btnUseText.on('pointerdown', () => {
      let selectedItem = this.selectItem.item[0];
      let selectedItemIndex = this.selectItemIndex;
      this.container.removeAt(selectedItemIndex);
      let item_key = selectedItem[1];
      let item = new selectedItem({
        scene: this
      }); 
      this.scene.hasItemList.splice(selectedItemIndex, 1 );
      this.displayItemList();
      this.cursor.visible = false;  
      this.btnUseText.visible = false;
      this.container.visible = false;
    });

    this.on('pointerdown', () => {
      // this.scene.stop("gaGameSceneme");
     
      if(this.togglePlay){
        this.container.visible = true;
        this.togglePlay = false;
      }else{
        this.container.visible = false;
        this.togglePlay = true;
      }
      
    });
    this.displayItemList();

  }
  displayItemList(){
    /*
    TODO
    itemのグループを作って一旦削除してから再描画する。
    */
    for(var i = 0; i < this.scene.hasItemList.length; i++){
      let item = this.scene.hasItemList[i];
      let item_obj = item[0];
      let item_key = item[1];
      let sprite = this.scene.add.sprite(30*(i+1), 170, item_key);
      sprite.depth = 101;
      sprite.setInteractive();
      this.container.add(sprite);
      // let index = i;
      sprite.index = i;
      sprite.item = item;
      sprite.on('pointerdown', () => {
        this.cursor.visible = true;
        this.cursor.x = sprite.x;
        this.cursor.y = sprite.y;
        this.selectItem = sprite;
        this.selectItemIndex = sprite.index;
        this.btnUseText.visible = true;
      },this);
    }    
  }
}
