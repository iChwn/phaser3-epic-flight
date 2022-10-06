import EnemyBullets from "../../bullets/enemyBullet";

type BulletBehaviour = {
  speed: number;
  shootEvery: number;
  shootDuration: number;
  kamikaze: boolean;
}

export type ZigzagBehaviour = {
  duration: number;
  wave: number;
  waveHeight: number;
}


export type NormalEnemiesType = {
  x: number;
  y: number;
  type: string;
  canFire: boolean;
  speed: number;
  setFire: EnemyBullets;
  bulletBehaviour: BulletBehaviour;
  zigzagBehaviour: ZigzagBehaviour;
}