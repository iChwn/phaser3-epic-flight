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

const normalEnemies = [
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 0,
    setFire: {},
    bulletBehaviour: {
      speed: 500,
      shootEvery: 1000,
      shootDuration: 3000,
      kamikaze: true
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
      speed: 150,
      shootEvery: 1000,
      shootDuration: 10000
    },
    zigzagBehaviour: {
      duration: 6000,
      wave: 20,
      waveHeight: 30
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 200,
    setFire: {},
    bulletBehaviour: {
      speed: 250,
      shootEvery: 1000,
      shootDuration: 10000
    },
    zigzagBehaviour: {
      duration: 10000,
      wave: 20,
      waveHeight: 60
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
      speed: 150,
      shootEvery: 1000,
      shootDuration: 10000
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 300,
    setFire: {},
    bulletBehaviour: {
      speed: 150,
      shootEvery: 1000,
      shootDuration: 10000
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
      speed: 150,
      shootEvery: 1000,
      shootDuration: 10000
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 200,
    setFire: {},
    bulletBehaviour: {
      speed: 250,
      shootEvery: 1000,
      shootDuration: 10000
    },
    zigzagBehaviour: {
      duration: 10000,
      wave: 20,
      waveHeight: 60
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
      speed: 150,
      shootEvery: 1000,
      shootDuration: 10000
    },
    zigzagBehaviour: {
      duration: 6000,
      wave: 20,
      waveHeight: 30
    }
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 0,
    setFire: {},
    bulletBehaviour: {
      speed: 500,
      shootEvery: 1000,
      shootDuration: 10000
    }
  },
]

export default normalEnemies