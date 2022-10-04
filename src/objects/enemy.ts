import Phaser from "phaser";
import { chainAnim, generateUID } from "../helper";
import { NormalEnemiesType, ZigzagBehaviour } from "./objectBehaviour/enemy/normalEnemy";

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
    
    if(this.zigzagBehaviour) {
      this.createPattern(objectProps)
    }

    this.setVelocityX(-objectProps.speed)
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
      this.destroy()
    }
  }
}

class Enemies extends Phaser.Physics.Arcade.Group {
  delayTembak: number
  constructor (scene:any) {
    super(scene.physics.world, scene);
    this.delayTembak = 0

    // this.SpritesPlatform = this.game.add.physicsGroup();
    // scene.physics.world.enableBody(this);
    this.createMultiple({
      frameQuantity: 10,
      key: 'bullet',
      active: false,
      visible: false,
      setScale: {
        x: 1.5,
        y: 1.5
      },
      setXY: {
        x: -50,
        y: -100
      },
      classType: Enemy
    });
  }

  summonEnemy (x:number, y:number, objectProps: any) {
    let enemy = this.getFirstDead(false);

    if(enemy) {
      enemy.respawnEnemy(x, y, objectProps);
      enemy.body.immovable = true
      
      if(objectProps.canFire) {
        this.enemyFire(enemy.x, enemy.y, objectProps, enemy)
      }
    //   this.delayTembak += delta
    //   if(this.delayTembak > 200) {
    //     enemy.respawnEnemy(x+50, y+30, delta);
    //     this.delayTembak = 0
    //   }
    }
  }

  enemyFire (x:number, y:number, objectProps: NormalEnemiesType, enemy: any) {
    const {bulletBehaviour}= objectProps
    let intervalID = setInterval(function() {
      enemy.playAfterRepeat('idleEnemy')
      let anims = [
        "attackEnemy",
        { 
          animate: "attackEnemyAfter", 
          triggerEvent: (callback: NormalEnemiesType) => objectProps.setFire?.fireBullet(callback.x-35  , callback.y, bulletBehaviour.speed)
        },
        "idleEnemy"
      ]

      chainAnim(anims, enemy) 
    }, bulletBehaviour.shootEvery);

    const self = this;
    setTimeout(function() {
      clearInterval(intervalID);
      if(bulletBehaviour.kamikaze) {
        self.sacrificeYourself(enemy)
      }
    }, bulletBehaviour.shootDuration);
  }

  sacrificeYourself(enemy:any) {
    setTimeout(() => {
      enemy.play("sacrificeEnemy");
      enemy.setVelocity(-800, -350)
      setTimeout(() => {
        enemy.play("deathEnemy");
      }, 800);
    }, 2000)
  }

  handleCollide (gameObject: any, bullet: any) {
    if(bullet.active && !gameObject.isExplode) {
      gameObject.isExplode = true

      bullet.setVisible(false)
      bullet.setActive(false)

      gameObject.setVelocity(0)
      gameObject.playAfterRepeat('idleEnemy')
      gameObject.play('deathEnemy')
      // this.scene.physics.world.colliders.destroy();      
      setTimeout(() => {
        gameObject.setVisible(false)
        gameObject.setActive(false)
        gameObject.destroy()
      }, 500);
    }
    
  }
}

export default Enemies;