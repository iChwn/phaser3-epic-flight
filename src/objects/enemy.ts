import Phaser from "phaser";
import { chainAnim, generateUID } from "../helper";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  isExplode: boolean;
  constructor (scene: any, x:number, y:number) {
    super(scene, x, y, 'enemy');

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

    let deathEnemy = {
      key: 'deathEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 19, end: 24 }),
      frameRate: 10,
      repeat: 0
    }

    this.anims.create(idleEnemy);
    this.anims.create(attackEnemy);
    this.anims.create(attackEnemyAfter);
    this.anims.create(deathEnemy);

    this.name = `enemy-${generateUID(5)}`
    this.isExplode = false
    this.flipX = true

    scene.add.existing(this).play("idleEnemy")
  }

  respawnEnemy (x:number, y:number){
    this.body.reset(x, y)
    this.setVelocityX(-100)
    this.setActive(true)
    this.setVisible(true)
  }

  preUpdate (time:number, delta:number){
    super.preUpdate(time, delta);

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
      this.enemyFire(enemy)
    //   this.delayTembak += delta
    //   if(this.delayTembak > 200) {
    //     enemy.respawnEnemy(x+50, y+30, delta);
    //     this.delayTembak = 0
    //   }
    }
  }

  enemyFire (enemy: any) {
    var intervalID = setInterval(function() {
      enemy.playAfterRepeat('idleEnemy')
      let anims = ["attackEnemy", "attackEnemyAfter", "idleEnemy"]
      chainAnim(anims, enemy) 
    }, 3000);
    setTimeout(function() {
        clearInterval(intervalID);
    }, 6000);
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