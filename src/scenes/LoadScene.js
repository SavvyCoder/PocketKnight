import 'phaser';
import { TYPES } from '../types';


export default class LoadScene extends Phaser.Scene {
    constructor() {
        super(TYPES.LOAD);
    }
    preload() {

        //Load Images 
        for (let img in TYPES.IMAGES) {
            console.log(img + ' : ' + TYPES.IMAGES[img]);
            this.load.image(TYPES.IMAGES[img], (TYPES.DIRECTORY.IMAGES + TYPES.IMAGES[img] + TYPES.DIRECTORY.IMAGE_FORMAT));
        }
        //Load Sprites
        for (let sprite in TYPES.SPRITES) {
            console.log(sprite + " : " + TYPES.SPRITES[sprite]);
            this.load.spritesheet(TYPES.SPRITES[sprite], (TYPES.DIRECTORY.SPRITES + TYPES.SPRITES[sprite] + TYPES.DIRECTORY.IMAGE_FORMAT), TYPES.DIRECTORY.SPRITE_FORMAT);
        }

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        });

        this.load.on("progress", (number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * number, 50);
            console.log(number);
        });


    }
    create() {

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('knight-walk-left', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'face-right',
            frames: [{ key: 'knight', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'face-left',
            frames: [{ key: 'knight-walk-left', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('knight-walk-right', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack-right',
            frames: this.anims.generateFrameNumbers('knight-attack-right', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "attack-left",
            frames: this.anims.generateFrameNumbers('knight-attack-left', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack-walk-right",
            frames: this.anims.generateFrameNumbers('knight-walk-right-attack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack-walk-left",
            frames: this.anims.generateFrameNumbers('knight-walk-left-attack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "slime-right",
            frames: this.anims.generateFrameNumbers('slime', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "slime-left",
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start(TYPES.SCENES.MENU);

    }
}
