import EnemiesBase from "./enemyBase";

export default class EnemyForward extends EnemiesBase {
  constructor (scene:any) {
    super(scene);
  }

  summonEnemy(x:number, y:number, enemyLength:number, objectProps: any) {
    let enemy = this.getFirstDead(false);
    this.enemyLength = enemyLength

    if(enemy) {
      enemy.respawnEnemy(x, y, objectProps);
      enemy.body.immovable = true
      enemy.setVelocityX(-objectProps.speed)
    }
  }
}