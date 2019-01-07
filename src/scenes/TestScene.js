import 'phaser';
import { TYPES } from '../types';

export default class TestScene extends Phaser.Scene {
    constructor() {
        super(TYPES.SCENES.TEST);
        this.platforms = null;
        this.player = null;
        this.cursors = null;
        this.spaceBar = null;
        this.stars = null;
        this.bombs = null;
        this.score = 0;
        this.gameOver = null;
        this.characterDir = {
            right: true,
            left: false,
            isRight: function() { if (this.right) { return true } else { return false } },
            rightTurn: function() {
                this.right = true;
                this.left = false;
            },
            leftTurn: function() {
                this.right = false;
                this.left = true;
            }
        };
    }


    init() {

        this.physics.world.setBounds(0, 0, 1600, 800);

    }

    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('ground', '../assets/grass-tile-1.png');
        this.load.image('star', '../assets/star.png');
        this.load.image('bomb', '../assets/bomb.png');
        this.load.spritesheet('knight',
            '../assets/pocket-knight-default.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-walk-left',
            '../assets/pocket-knight-default-walk-left.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-walk-right',
            '../assets/pocket-knight-default-walk-right.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-attack-right',
            '../assets/pocket-knight-default-attack-right.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-attack-left',
            '../assets/pocket-knight-default-attack-left.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-attack-walk-right',
            '../assets/pocket-knight-default-walk-right-attack.png', { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('knight-attack-walk-left',
            '../assets/pocket-knight-default-walk-left-attack .png', { frameWidth: 32, frameHeight: 32 }
        );

    }

    create() {

        this.cameras.main.setBounds(0, 0, 1600, 600);

        this.add.image(400, 300, 'sky').setScale(2).setScrollFactor(1);

        this.platforms = this.physics.add.staticGroup();

        //Add in dynamic game height
        let pixel32width = 1600;
        // Math.ceil(this.sys.game.config.width / 32);
        let pixel32ground = this.sys.game.config.height - 48;

        console.log(pixel32width);
        console.log(pixel32ground);

        let groundPos = 0;

        for (let i = 0; i <= pixel32width; i++) {
            this.platforms.create(groundPos, (pixel32ground + 32), 'ground').setScale(2);
            groundPos += 32;
        }


        this.platforms.create(600, 400, 'ground').setScale(2);
        this.platforms.create(50, 250, 'ground').setScale(2);
        this.platforms.create(750, 220, 'ground').setScale(2);

        this.player = this.physics.add.sprite(100, 450, 'knight').setScale(2);

        this.player.setBounce(0.2);

        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player, true, .09, .09);

        //this.cameras.main.setZoom(1);

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
            frames: this.anims.generateFrameNumbers('knight-attack-walk-right', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack-walk-left",
            frames: this.anims.generateFrameNumbers('knight-attack-walk-left', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });


        console.log(this.anims.generateFrameNumbers('knight-walk-right', { start: 0, end: 6 }));

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function(child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

        function collectStar(player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function(child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;

            }
        }

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        function hitBomb(player, bomb) {
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            this.gameOver = true;
        }
    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.characterDir.leftTurn();
            if (this.spaceBar.isDown) {
                this.player.anims.play("attack-walk-left", true);
            }
            else {
                this.player.anims.play('left', true);
            }
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.characterDir.rightTurn();
            if (this.spaceBar.isDown) {
                this.player.anims.play("attack-walk-right", true);
            }
            else {
                this.player.anims.play('right', true);
            }
        }
        else {
            this.player.setVelocityX(0);
            if (this.characterDir.isRight()) {
                if (this.spaceBar.isDown) {
                    this.player.anims.play("attack-right", true);
                }
                else {
                    this.player.anims.play("face-right");
                }
            }
            else {
                if (this.spaceBar.isDown) {
                    this.player.anims.play("attack-left", true);
                }
                else {
                    this.player.anims.play("face-left");
                }
            }
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
