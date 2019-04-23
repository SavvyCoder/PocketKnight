import 'phaser';
import { TYPES } from '../types.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super(TYPES.SCENES.MENU);
    }

    create() {

        this.startButton = this.add.text((this.game.renderer.width / 2) - 150, (this.game.renderer.height / 2) - 75, "START", { fontSize: 100, fillstyle: { color: 0xffffff } });

        this.startButton.setInteractive()
            .on("pointerdown", () => {
                this.scene.start(TYPES.SCENES.GAME);
            });

    }

}
