export default class Animations{
  constructor(config) {

    config.scene.anims.create({
      key: 'explosionAnime_m',
      frames: config.scene.anims.generateFrameNumbers('explosion_m', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });
    config.scene.anims.create({
      key: 'badAnime',
      frames: config.scene.anims.generateFrameNumbers('bad', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });      
    config.scene.anims.create({
      key: 'playerIdleAnime',
      frames: config.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    }); 
    config.scene.anims.create({
      key: 'playerBottom',
      frames: config.scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    }); 
    config.scene.anims.create({
      key: 'playerTop',
      frames: config.scene.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1
    }); 

    config.scene.anims.create({
      key: 'playerStarAnime',
      frames: config.scene.anims.generateFrameNumbers('player_star', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });  
    config.scene.anims.create({
      key: 'swordAnime',
      frames: config.scene.anims.generateFrameNumbers('sword_anime', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: 0
    });  
    config.scene.anims.create({
      key: 'swordAnimeL',
      frames: config.scene.anims.generateFrameNumbers('sword_anime_l', { start: 0, end: 6 }),
      frameRate: 16,
      repeat: 0
    });
  }
}
