import 'phaser';
import { TYPES } from '../types';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super(TYPES.SCENES.GAME);
    }

    preload() {
        this.load.image('knight', 'assets/pocket-knight-default.png');
    }

    create() {
        var logo = this.add.image(400, 150, 'knight');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }

}
