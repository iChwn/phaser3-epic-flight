import Phaser from "phaser";
import { gameConfig } from "../../config";
import { generateUID } from "../../helper";

class Bullet extends Phaser.Physics.Arcade.Sprite {
  delayTembak: number
  constructor (scene: any, x:number, y:number) {
    super(scene, x, y, 'bullet1');
    this.delayTembak = 0

    this.anims.create({
      key: 'fire',
      frames: [
          { key: 'bullet1' },
          { key: 'bullet2' },
          { key: 'bullet3' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.name = `bullets-${generateUID(5)}`
    scene.add.existing(this).play("fire")
  }

  setFire (x:number, y:number){
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setVelocityX(600)   
  }

  setCollide() {
    console.log("setCollide bullet") 
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

class PlaneBullets extends Phaser.Physics.Arcade.Group {
  delayTembak: number
  constructor (scene:any) {
    super(scene.physics.world, scene);
    this.delayTembak = 0

    // this.SpritesPlatform = scene.add.physicsGroup();
    // scene.physics.world.enableBody(this);
    this.createMultiple({
      frameQuantity: 30,
      key: 'bullet',
      active: false,
      visible: false,
      setXY: {
        x: -50,
        y: 0
      },
      classType: Bullet
    });
  }

  fireBullet (x:number, y:number, delta:number) {
    let bullet = this.getFirstDead(false);

    if(bullet) {
      this.delayTembak += delta
      if(this.delayTembak > 200) {
        bullet.setFire(x+50, y+30, delta);
        this.delayTembak = 0
      }
    }
  }

  handleCollide (gameObject: any, enemy: any) {
    if(gameObject.active && !enemy.isExplode) {
      gameObject.setVisible(false)
      gameObject.setActive(false)
    }    
    // gameObject.destroy()
  }
}

// class Bullets extends Phaser.GameObjects.Sprite {  
//   constructor(config: BulletType) {
//     const {scene, x, y} = config;
//     super(scene, x+150, y+90, "bullet1");

//     this.anims.create({
//       key: 'fire',
//       frames: [
//           { key: 'bullet1' },
//           { key: 'bullet2' },
//           { key: 'bullet3' },
//       ],
//       frameRate: 8,
//       repeat: -1
//     });
 
//     this.name = "bullets"
//     scene.physics.world.enableBody(this);
//     scene.add.existing(this).play("fire")
//     // this.setScale(.4)

//     if("setCollideWorldBounds" in this.body) {
//       this.body.onWorldBounds = true;
//       this.body.setCollideWorldBounds(true);
//     }

//     scene.physics.world.on("worldbounds",  (body: Phaser.Physics.Arcade.Body) => {
//       body.gameObject.destroy()
//     });
    
//     if('setVelocity' in this.body) {
//       // this.body.setCollideWorldBounds(true);
//       this.body.setImmovable(true)
//       this.body.setVelocityX(500)

//     }
//   }

//   setCollider(collideObject: Phaser.GameObjects.GameObject) {
//     this.scene.physics.add.collider(this, collideObject, () => console.log("Game Over"))
//   }
// }

export default PlaneBullets;