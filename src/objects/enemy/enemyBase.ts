import Phaser from "phaser";
import { chainAnim } from "../../helper";
import Enemy from "./enemy";

class EnemiesBase extends Phaser.Physics.Arcade.Group {
  enemyLength:number;
  overlayTimer: number;
  overlayTimeout: number;
  constructor (scene:any) {
    super(scene.physics.world, scene);
    this.enemyLength = 0;
    this.overlayTimer = 0;
    this.overlayTimeout = 2000;

    // this.SpritesPlatform = this.game.add.physicsGroup();
    // scene.physics.world.enableBody(this);
    this.createMultiple({
      frameQuantity: 10,
      key: 'enemies',
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

  summonEnemy (x:number, y:number, enemyLength:number, objectProps: any) {
    let enemy = this.getFirstDead(false);
    this.enemyLength = enemyLength

    if(enemy) {
      enemy.respawnEnemy(x, y, objectProps);
      enemy.body.immovable = true
    }
  }

  handleCollide (gameObject: any, bullet: any, callback: Function) {
    if(bullet.active && !gameObject.isExplode) {
      this.enemyLength = this.enemyLength - 1
      gameObject.isExplode = true
      gameObject.setVelocity(0,0)

      bullet.setVisible(false)
      bullet.setActive(false)      

      let anims = [
        "deathEnemy",
        "idleEnemy"
      ]
      chainAnim(anims, gameObject)
      // gameObject.setVelocity(0)
      // gameObject.playAfterRepeat('idleEnemy')
      // gameObject.play('deathEnemy')
      // this.scene.physics.world.colliders.destroy();      
      let self = this
      setTimeout(() => {
        gameObject.setVisible(false)
        gameObject.setActive(false)
        // gameObject.destroy()
        // console.log(self.enemyLength)
        callback(self.enemyLength)
      }, 500);
    }
  }

  onStopCollide(object: Phaser.Physics.Arcade.Sprite) {
    if(object.body.x < -50) {
      object.setActive(false)
      object.setVisible(false)
      if(!object.active) {
        console.log("WADEZIG")
      }
    }
    // clearTimeout(this.overlayTimer);
    // this.overlayTimer = setTimeout(() => {
    //   this.enemyLength = this.enemyLength - 1
      
    // }, this.overlayTimeout);
  }
}

export default EnemiesBase;