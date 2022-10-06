const shootEnemies = [
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

export default shootEnemies