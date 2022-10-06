import { chainAnim } from "../../helper";
import { NormalEnemiesType } from "../objectBehaviour/enemy/enemyType";
import EnemiesBase from "./enemyBase";

export default class EnemyShoot extends EnemiesBase {
  constructor (scene:any) {
    super(scene);
  }

  summonEnemy (x:number, y:number, enemyLength:number, objectProps: any) {
    let enemy = this.getFirstDead(false);
    this.enemyLength = enemyLength
    
    if(enemy) {
      enemy.respawnEnemy(x, y, objectProps);
      enemy.body.immovable = true
      
      this.enemyFire(enemy.x, enemy.y, objectProps, enemy)
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
}