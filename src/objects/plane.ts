import Phaser from "phaser";
import { gameConfig } from "../config";
import Bullet from "./bullet";

type PlaneType = {
  scene: any,
  x: number,
  y: number,
}

class Plane extends Phaser.GameObjects.Sprite {  
  delayTembak: number
  constructor(config: PlaneType) {
    const {scene, x, y} = config;
    super(scene, x, y, "plane1");
    this.delayTembak = 0

    this.anims.create({
      key: 'idle',
      frames: [
          { key: 'plane1' },
          { key: 'plane2' },
      ],
      frameRate: 8,
      repeat: -1
    });


    scene.physics.world.enableBody(this);
    scene.add.existing(this).play('idle');
    this.setScale(.4)
    
    if('setVelocity' in this.body) {
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true)
    }
  }

  setCollider(collideObject: Phaser.GameObjects.GameObject) {
    this.scene.physics.add.collider(this, collideObject, this.handleCollide, () => {}, this)
  }

  handleCollide() {
    console.log("PESAWAT TERTABRAK")
  }

  update(time: number, delta: number): void {
    const {keys, planeSpeed} = gameConfig

    if('setVelocity' in this.body) {
      this.body.setVelocity(0)
      if(keys.w.isDown) {
        this.body.setVelocityY(-planeSpeed)
      }
      if(keys.s.isDown) {
        this.body.setVelocityY(planeSpeed)
      }
    }

    // if(keys.space.isDown) {
    //   let fireBullet = null
    //   if("x" in this.body) {
    //     this.delayTembak += delta
    //     if(this.delayTembak > 200) {
    //       fireBullet = new Bullet({scene: this.scene, x: this.body.x, y: this.body.y})
          
    //       fireBullet.setCollider(fireBullet)
    //       this.delayTembak = 0
    //     }
    //   }
      
    // }
  }
}

export default Plane;