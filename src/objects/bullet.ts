import Phaser from "phaser";
import { gameConfig } from "../config";

type BulletType = {
  scene: any,
  x: number,
  y: number,
}

class Bullet extends Phaser.GameObjects.Sprite {  
  constructor(config: BulletType) {
    const {scene, x, y} = config;
    super(scene, x+150, y+90, "bullet1");

    this.anims.create({
      key: 'fire',
      frames: [
          { key: 'bullet1' },
          { key: 'bullet2' },
          { key: 'bullet3' },
      ],
      frameRate: 8,
      repeat: -1
    });
 
    scene.physics.world.enableBody(this);
    scene.add.existing(this).play("fire")
    // this.setScale(.4)

    if("setCollideWorldBounds" in this.body) {
      this.body.onWorldBounds = true;
      this.body.setCollideWorldBounds(true);
    }

    scene.physics.world.on("worldbounds",  (body: Phaser.Physics.Arcade.Body) => {
      body.gameObject.destroy()
    });
    
    if('setVelocity' in this.body) {
      // this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true)
      this.body.setVelocityX(500)

    }
  }
}

export default Bullet;