import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {debug: false}
  },
};


type GameConfig = {
  [keys: string]: any; // 👈️ variable key
  planeSpeed: number;
};

const gameConfig: GameConfig = {
  keys: {},
  planeSpeed: 1000
}

export { gameConfig }