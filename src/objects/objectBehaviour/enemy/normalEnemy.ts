import EnemyBullets from "../../bullets/enemyBullet";

type BulletBehaviour = {
  speed: number;
}

export type NormalEnemiesType = {
  x: number;
  y: number;
  type: string;
  canFire: boolean;
  speed: number;
  setFire: EnemyBullets;
  bulletBehaviour: BulletBehaviour;
}

const normalEnemies = [
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 100,
    setFire: {},
    bulletBehaviour: {
      speed: 500
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 150,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 200,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 250,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 250,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 200,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 150,
    setFire: {},
    bulletBehaviour: {
      speed: 150
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 100,
    setFire: {},
    bulletBehaviour: {
      speed: 500
    }
  },
]

export default normalEnemies