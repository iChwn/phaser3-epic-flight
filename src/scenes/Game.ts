import Phaser from 'phaser';
import Plane from '../objects/plane';
import config, { gameConfig } from "../config"
import Enemy from '../objects/enemy';
import PlaneBullets from '../objects/bullets/planeBullet';
import Enemies from '../objects/enemy';
import normalEnemies from '../objects/objectBehaviour/enemy/normalEnemy';
import EnemyBullets from '../objects/bullets/enemyBullet';

export default class Demo extends Phaser.Scene {
  plane: Plane | null;
  enemies: Enemies | null;
  planeBullets: PlaneBullets | null;
  enemyBullets: EnemyBullets | null;
  constructor() {
    super('GameScene');
    this.plane = null;
    this.enemies = null;
    this.planeBullets = null;
    this.enemyBullets = null;
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
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
    const logo = this.add.image(400, 70, 'logo');
    this.plane = new Plane({scene: this, x: 100, y: this.physics.world.bounds.height / 2})
    this.physics.add.existing(this.plane)

    this.planeBullets = new PlaneBullets(this);

    this.enemies = new Enemies(this)
    this.enemyBullets = new EnemyBullets(this);
    

    const worldHeight = this.physics.world.bounds.height;
    const worldWidth = this.physics.world.bounds.width;
    for (let i = 0; i < normalEnemies.length; i++) {
      const element = normalEnemies[i];
      element.setFire = this.enemyBullets
      const distance = worldHeight / (normalEnemies.length+1) * (i+1)

      this.enemies.summonEnemy(worldWidth + 100, worldHeight - distance, element)      
    }

    let planeBullets = this.planeBullets
    let enemies = this.enemies
    this.physics.add.overlap(
      this.planeBullets,
      this.enemies,
      function (bullet, enemy) {
        enemies.handleCollide(enemy, bullet)
        planeBullets.handleCollide(bullet, enemy)
      }
    );

    let planeObj = this.plane
    this.physics.add.collider(
      this.plane,
      this.enemies,
      function (plane, enemy) {
        planeObj.onCollide(plane)
        // enemies.handleCollide(enemy, bullet)
        // planeBullets.handleCollide(bullet, enemy)
      }
    );

    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  update(time: number, delta: number): void {
    const {keys} = gameConfig

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
