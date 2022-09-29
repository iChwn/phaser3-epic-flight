import Phaser from "phaser";
import { gameConfig } from "../../config";
import { generateUID } from "../../helper";

class Bullet extends Phaser.Physics.Arcade.Sprite {
  delayTembak: number
  constructor (scene: any, x:number, y:number) {
    super(scene, x, y, 'Enemybullet1');
    this.delayTembak = 0

    this.anims.create({
      key: 'fire',
      frames: [
          { key: 'Enemybullet1' },
          { key: 'Enemybullet1' },
          { key: 'Enemybullet1' },
      ],
      frameRate: 8,
      repeat: -1,
    });
    this.name = `bullets-${generateUID(5)}`
    this.flipX = true
    scene.add.existing(this).play("fire")
  }

  setFire (x:number, y:number, bulletSpeed:number){
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setVelocityX(-bulletSpeed)   
  }

  setCollide() {
    console.log("setCollide bullet") 
  }

  preUpdate (time:number, delta:number){
    super.preUpdate(time, delta);
    
    if(this.x <=  0){
      this.setActive(false);
      this.setVisible(false);
      // this.destroy()
    }
  }
}

class EnemyBullets extends Phaser.Physics.Arcade.Group {
  delayTembak: number
  constructor (scene:any) {
    super(scene.physics.world, scene);
    this.delayTembak = 0

    // this.SpritesPlatform = scene.add.physicsGroup();
    // scene.physics.world.enableBody(this);
    this.createMultiple({
      frameQuantity: 100,
      key: 'bullet',
      active: false,
      visible: false,
      setScale: {
        x: .4,
        y: .4
      },
      setXY: {
        x: -50,
        y: 0
      },
      classType: Bullet
    });
  }

  fireBullet (x:number, y:number, bulletSpeed: number) {
    let bullet = this.getFirstDead(false);

    if(bullet) {
      bullet.setFire(x, y, bulletSpeed);
      // this.delayTembak = 0
      // this.delayTembak += delta
      // if(this.delayTembak > 200) {
      //   bullet.setFire(x+50, y+30, delta);
      //   this.delayTembak = 0
      // }
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

export default EnemyBullets;