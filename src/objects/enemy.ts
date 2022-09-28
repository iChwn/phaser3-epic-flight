import Phaser from "phaser";
import { gameConfig } from "../config";
import { generateUID } from "../helper";

type BulletType = {
  scene: any,
  x: number,
  y: number,
}


class Enemy extends Phaser.Physics.Arcade.Sprite {
  isExplode: boolean;
  constructor (scene: any, x:number, y:number) {
    super(scene, x, y, 'enemy');

    let idleEnemy = {
      key: 'idleEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    }

    let deathEnemy = {
      key: 'deathEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 19, end: 24 }),
      frameRate: 8,
      repeat: -1
    }

    this.anims.create(idleEnemy);
    this.anims.create(deathEnemy);

    this.name = `enemy-${generateUID(5)}`
    this.isExplode = false
    this.flipX = true

    scene.add.existing(this).play("idleEnemy")
  }

  respawnEnemy (x:number, y:number){
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    // this.setVelocityX(-500)   
  }

  preUpdate (time:number, delta:number){
    super.preUpdate(time, delta);
    
    if(this.x >=  this.scene.physics.world.bounds.width){
      this.setActive(false);
      this.setVisible(false);
      // this.destroy()
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
      frameQuantity: 5,
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

  summonEnemy (x:number, y:number) {
    let enemy = this.getFirstDead(false);

    if(enemy) {
      enemy.respawnEnemy(x+50, y+30);
      enemy.body.immovable = true

    //   this.delayTembak += delta
    //   if(this.delayTembak > 200) {
    //     enemy.respawnEnemy(x+50, y+30, delta);
    //     this.delayTembak = 0
    //   }
    }
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

// class Enemies extends Phaser.GameObjects.Sprite {  
//   constructor(config: BulletType) {
//     const {scene, x, y} = config;
//     super(scene, x, y, "enemy");

//     let idleEnemy = {
//       key: 'idleEnemy',
//       frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 4 }),
//       frameRate: 10,
//       repeat: -1
//     }

//     let deathEnemy = {
//       key: 'deathEnemy',
//       frames: this.anims.generateFrameNumbers('enemy', { start: 19, end: 24 }),
//       frameRate: 8,
//       repeat: -1
//     }

//     this.anims.create(idleEnemy);
//     this.anims.create(deathEnemy);
 
//     this.name = "enemy"
//     scene.physics.world.enableBody(this);
//     scene.add.existing(this).play("idleEnemy")

//     let dragon = this
 
//     this.flipX = true

//     if('setVelocity' in this.body) {
//       this.body.setImmovable(true)
//       // this.body.setVelocityX(-500)
//     }
//     this.setScale(1.5)

//     // this.scene.physics.add.collider(this, collideObject, () => console.log("WWWW"), () => {}, this)


//     // if("setCollideWorldBounds" in this.body) {
//     //   this.body.onWorldBounds = true;
//     //   this.body.setCollideWorldBounds(true);
//     // }

//     // scene.physics.world.on("worldbounds",  (body: Phaser.Physics.Arcade.Body) => {
//     //   body.gameObject.destroy()
//     // });
    
//     // if('setVelocity' in this.body) {
//     //   // this.body.setCollideWorldBounds(true);
//     //   this.body.setImmovable(true)
//     //   this.body.setVelocityX(500)

//     // }
//   }

//   update(...args: any[]): void {
//     // console.log(this.scene.children.list)
//     const lastIndexList = this.scene.children.list[this.scene.children.list.length-1]
//     if(lastIndexList.name === "bullets") {
//       this.scene.physics.add.collider(this, lastIndexList, () => this.handleCollide(lastIndexList), () =>{}, this)
//     }

//   }

//   handleCollide(lastIndexList: any) {
//     lastIndexList.destroy()

//     // window.testing = this
//     this.playAfterRepeat('idleEnemy')
//     this.play('deathEnemy')
//     setTimeout(() => {
//       this.setVisible(false)
//       // this.destroy()
//     }, 500);
//   }

//   removeCollider(collider: any) {
//     this.scene.physics.world.removeCollider(collider);
//     // this.physics.world.removeCollider(collider);
//   }
// }

export default Enemies;