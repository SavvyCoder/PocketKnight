export const TYPES = {
    SCENES: {
        START: "START",
        GAME: "GAME",
        TEST: "TEST",
        LOAD: "LOAD",
        MENU: "MENU"
    },
    IMAGES: {
        GROUND: "grass-tile-1",
        DIRT: "dirt-tile",
        BOMB: "bomb",
        SKY: "sky",
        STAR: "star"
    },
    SPRITES: {
        KNIGHT: "knight",
        KNIGHT_ATTACK_RIGHT: "knight-attack-right",
        KNIGHT_ATTACK_LEFT: "knight-attack-left",
        KNIGHT_WALK_LEFT: "knight-walk-left",
        KNIGHT_WALK_RIGHT: "knight-walk-right",
        KNIGHT_WALK_RIGHT_ATTACK: "knight-walk-right-attack",
        KNIGHT_WALK_LEFT_ATTACK: "knight-walk-left-attack",
        SLIME: "slime"
    },
    DIRECTORY: {
        IMAGES: '../assets/img/',
        SPRITES: '../assets/sprites/',
        IMAGE_FORMAT: '.png',
        SPRITE_FORMAT: { frameWidth: 32, frameHeight: 32 }
    }
};
