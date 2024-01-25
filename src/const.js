const PACMAN_SOUNDS = {
    moveSound: './assets/sounds/pacman_move.mp3',
    eatSound: './assets/sounds/pacman_eatfruit.mp3',
    deadSound: './assets/sounds/pacman_death.mp3',
    soundtrackSound: './assets/sounds/pacman_soundtrack.mp3'
}

const RAMPAGE_SOUNDS = {
    dominating: './assets/sounds/dominating.mp3',
    rampage: './assets/sounds/rampage.mp3',
    unstoppable: './assets/sounds/unstoppable.mp3',
    godlike: './assets/sounds/godlike.mp3'
}

const COOKIES_COUNT = 234
const CALORY_INCREASE = 35

const TROPHY_COUNT = 4
const TROPHY_CALORY_INCREASE = 100

const WALL_COLORS = ['wall-1', 'wall-2', 'wall-3', 'wall-4', 'wall-5', 'wall-6', 'wall-7', 'wall-8']

const DIFFICULTY_LEVELS = {
    normal: {
        speed: 250,
        ghostsCount: 4
    },
    nightmare: {
        speed: 100,
        ghostsCount: 6
    },
    hell: {
        speed: 100,
        ghostsCount: 6
    },
}


export {
        PACMAN_SOUNDS,
        RAMPAGE_SOUNDS,
        CALORY_INCREASE, 
        COOKIES_COUNT,
        TROPHY_COUNT,
        TROPHY_CALORY_INCREASE,
        WALL_COLORS,
        DIFFICULTY_LEVELS
    }
