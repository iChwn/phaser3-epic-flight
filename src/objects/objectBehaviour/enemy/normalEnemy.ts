export type NormalEnemiesType = {
  x: number;
  y: number;
  type: string;
  canFire: boolean;
  speed: number;
}

const normalEnemies = [
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 100
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 150
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 200
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 100
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 100
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 200
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: false,
    speed: 150
  },
  {
    x: 0,
    y: 0,
    type: "normal",
    canFire: true,
    speed: 100
  },
]

export default normalEnemies