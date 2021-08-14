import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { MainMenuScene } from './scenes/main-menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Flappy Bird',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 }
    }
  },
  backgroundColor: '#98d687',
  render: { pixelArt: false, antialias: true, roundPixels: true }
};
