import 'phaser';
import config from './config/config.js';
import GameScene from './scenes/GameScene.js';
import { TYPES } from './types.js';
import TestScene from './scenes/TestScene.js';

var game = new Phaser.Game(config);

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add(TYPES.SCENES.TEST, TestScene);
        this.scene.start(TYPES.SCENES.TEST);
    }
}

window.onload = function() {
    window.game = new Game();
}
