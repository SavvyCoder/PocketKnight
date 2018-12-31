import 'phaser';
//import config from './config/config.js';
import GameScene from './scenes/GameScene.js';
import TYPES from './types.js';
import TestScene from './scenes/TestScene.js';

// class Game extends Phaser.Game {
//     constructor() {
//         super(config);
//         this.scene.add(TYPES.SCENES.TEST, TestScene);
//         this.scene.start(TYPES.SCENES.TEST);
//     }
// }

var game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        TestScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    render: {
        pixelArt: true
    }
});

// window.onload = function() {
//     window.game = new Game();
// }
