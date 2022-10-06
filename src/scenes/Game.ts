import Phaser from 'phaser';
import Plane from '../objects/plane';
import config, { gameConfig } from "../config"
import PlaneBullets from '../objects/bullets/planeBullet';
import normalEnemies from '../objects/objectBehaviour/enemy/normalEnemy';
import EnemyBullets from '../objects/bullets/enemyBullet';
import EnemyShoot from '../objects/enemy/enemyShoot';
import EnemiesBase from '../objects/enemy/enemyBase';
import EnemyForward from '../objects/enemy/enemyForward';
import forwardEnemies from '../objects/objectBehaviour/enemy/forwardEnemy';
import shootEnemies from '../objects/objectBehaviour/enemy/shootEnemy';

export default class Demo extends Phaser.Scene {
  plane: Plane | null;
  planeBullets: PlaneBullets | null;
  enemyBullets: EnemyBullets | null;
  overlayTimer: number;
  overlayTimeout: number;
  waveState: number;
  constructor() {
    super('GameScene');
    this.plane = null;
    this.planeBullets = null;
    this.enemyBullets = null;
    this.overlayTimer = 0;
    this.overlayTimeout = 2000;
    this.waveState = 0;
  }

  preload() {
    this.load.image('plane1', 'assets/plane/Fly (1).png');
    this.load.image('plane2', 'assets/plane/Fly (2).png');
    this.load.image('bullet1', 'assets/bird/yellowbird-midflap.png');
    this.load.image('bullet2', 'assets/bird/yellowbird-downflap.png');
    this.load.image('bullet3', 'assets/bird/yellowbird-upflap.png');
    this.load.image('Enemybullet1', 'assets/bullet/Bullet (1).png');

    // this.load.image('enemy', 'assets/enemy/dragon.png');
    this.load.spritesheet('enemy', 'assets/enemy/dragon.png', { frameWidth: 62, frameHeight: 72 });

  }

  create() {
    const {keys} = gameConfig
    this.plane = new Plane({scene: this, x: 100, y: this.physics.world.bounds.height / 2})
    this.physics.add.existing(this.plane)

    this.planeBullets = new PlaneBullets(this);
    this.enemyBullets = new EnemyBullets(this);
    
    this.setEnemy(normalEnemies, new EnemiesBase(this))
    // new EnemiesBase(this)

    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  setEnemy(enemiesList:any, enemy:any) {
    const worldHeight = this.physics.world.bounds.height;
    const worldWidth = this.physics.world.bounds.width;
    const enemyLength = enemiesList.length
    this.waveState = this.waveState + 1;

    for (let i = 0; i < enemyLength; i++) {
      const element = enemiesList[i];
      element.setFire = this.enemyBullets
      const distance = worldHeight / (enemyLength+1) * (i+1)

      enemy!.summonEnemy(worldWidth / 1.2, worldHeight - distance, enemyLength, element)      
    }

    let planeBullets = this.planeBullets
    let enemies = enemy
    let self = this

    this.physics.add.overlap(
      this.planeBullets!,
      enemy!,
      function (bullet, enemy) {
        enemies!.handleCollide(enemy, bullet, (kasar:number) => {
          clearTimeout(self.overlayTimer);
          self.overlayTimer = setTimeout(() => {
            console.log(kasar)
            if(kasar === 0) {
              if(self.waveState === 1) {
                self.setEnemy(forwardEnemies, new EnemyForward(self))
              } else if(self.waveState === 2) {
                self.setEnemy(shootEnemies, new EnemyShoot(self))
              } 
            }
          }, self.overlayTimeout);
        })

        planeBullets!.handleCollide(bullet, enemy)
      }
    );
  }

  update(time: number, delta: number): void {
    const {keys} = gameConfig
    // console.log(this.enemies1?.children.entries.length)
    this.plane?.update(time, delta)
    if(keys.space.isDown) {
      this.planeBullets?.fireBullet(this.plane!.x, this.plane!.y, delta);
    }
    // this.plane!.body.setVelocity(0)

    // if(keys.w.isDown) {
    //   console.log(this.plane)
    //   this.plane.body.setVelocityY(-planeSpeed)
    //   // this.plane!.body.velocity = -planeSpeed
    // }
    // if(keys.s.isDown) {
    //   this.plane!.body.setVelocityY(planeSpeed)
    // }
  }
}
