import Phaser from "phaser";
import { chainAnim, generateUID } from "../../helper";
import { NormalEnemiesType, ZigzagBehaviour } from "../objectBehaviour/enemy/enemyType";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  isExplode: boolean;
  zigzagBehaviour: ZigzagBehaviour | null;
  graphics: any;
  path: any;
  constructor (scene: any, x:number, y:number) {
    super(scene, x, y, 'enemy');
    this.graphics = null;
    this.path = null;

    let idleEnemy = {
      key: 'idleEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 8 }),
      frameRate: 13,
      repeat: -1
    }

    let attackEnemy = {
      key: 'attackEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 9, end: 17 }),
      frameRate: 10,
    }

    let attackEnemyAfter = {
      key: 'attackEnemyAfter',
      frames: this.anims.generateFrameNumbers('enemy', { frames: [ 10, 9, 8 ] }),
      frameRate: 10,
    }

    let sacrificeEnemy = {
      key: 'sacrificeEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 15, end: 17 }),
      frameRate: 10,
      repeat: -1
    }

    let deathEnemy = {
      key: 'deathEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 19, end: 24 }),
      frameRate: 10,
      repeat: 0
    }

    this.anims.create(idleEnemy);
    this.anims.create(attackEnemy);
    this.anims.create(attackEnemyAfter);
    this.anims.create(sacrificeEnemy);
    this.anims.create(deathEnemy);

    this.name = `enemy-${generateUID(5)}`
    this.isExplode = false
    this.zigzagBehaviour = null
    this.flipX = true

    scene.add.existing(this).play("idleEnemy")
  }

  respawnEnemy (x:number, y:number, objectProps:NormalEnemiesType) {
    this.body.reset(x, y)
    this.zigzagBehaviour = objectProps.zigzagBehaviour
    this.isExplode = false
    
    if(this.zigzagBehaviour) {
      this.createPattern(objectProps)
    }

    // this.setVelocityX(-objectProps.speed)
    this.setActive(true)
    this.setVisible(true)
  }

  createPattern(objectProps:NormalEnemiesType) {
    const {duration, wave, waveHeight} = objectProps.zigzagBehaviour
    this.setData('vector', new Phaser.Math.Vector2());
    this.scene.tweens.add({
      targets: this,
      z: 1,
      ease: 'Linear',
      duration: duration,
      // repeat: -1,
    });
    
    const worldWidth = this.scene.physics.world.bounds.width;
    this.graphics = this.scene.add.graphics();
    this.path = new Phaser.Curves.Path(worldWidth, this.y);
    this.path.lineTo(worldWidth-100, this.y);

    let waveX = (worldWidth/1.1) / wave;
    // console.log(h)

    for (let i = 0; i < wave; i++) {
      if (i % 2 === 0) {
        this.path.lineTo((worldWidth-100) - waveX * (i + 1), this.y-waveHeight);
      } else {
        this.path.lineTo((worldWidth-100) - waveX * (i + 1), this.y+waveHeight);
      }
    }

    this.path.lineTo(-50, this.y);
  }

  preUpdate (time:number, delta:number){
    super.preUpdate(time, delta);

    if(this.zigzagBehaviour) {
      this.graphics.clear();
      // this.graphics.lineStyle(1, 0xffffff, 1);
      this.path.draw(this.graphics);

      var zPos = this.z;
      var velo = this.getData('vector');
      this.path.getPoint(zPos, velo)
      this.setPosition(velo.x, velo.y)
    }

    if(this.x <= -50){
      this.setActive(false);
      this.setVisible(false);
      // this.destroy()
    }
  }
}

export default Enemy;