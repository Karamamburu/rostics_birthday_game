const PACMAN_SOUNDS = {
    moveSound: '/rostics_birthday_game/assets/sounds/pacman_move.mp3',
    winSound: '/rostics_birthday_game/assets/sounds/pacman_win.mp3',
    deadSound: '/rostics_birthday_game/assets/sounds/pacman_death.mp3',
    soundtrackSound: '/rostics_birthday_game/assets/sounds/pacman_soundtrack.mp3'
}

const RAMPAGE_SOUNDS = {
    dominating: '/rostics_birthday_game/assets/sounds/dominating.mp3',
    rampage: '/rostics_birthday_game/assets/sounds/rampage.mp3',
    unstoppable: '/rostics_birthday_game/assets/sounds/unstoppable.mp3',
    godlike: '/rostics_birthday_game/assets/sounds/godlike.mp3'
}

const VOLUMES = {
    high: 1,
    medium: 0.1,
    half: 0.05,
    low: 0.01
}

const COOKIES_COUNT = 234
const CALORY_INCREASE = 40

const TROPHY_COUNT = 4
const TROPHY_CALORY_INCREASE = 160

const WALL_COLORS = ['wall-1', 'wall-2', 'wall-3', 'wall-4', 'wall-5', 'wall-6', 'wall-7', 'wall-8']

const DIFFICULTY_LEVELS = {
    normal: {
        speed: 250,
        ghostsCount: 6
    },
    nightmare: {
        speed: 150,
        ghostsCount: 6
    },
    hell: {
        speed: 100,
        ghostsCount: 8
    },
}

const GHOST_START_INDEX = [29, 54, 289, 298, 356, 371, 729, 754]
const GHOST_STYLES = ['ghost-apple', 'ghost-avocado', 'ghost-broccoli', 'ghost-cucumber', 'ghost-lemon', 'ghost-orange', 'ghost-pumpkin', 'ghost-tomato']

const WIN_MESSAGE = `Ура! Поздравляем с победой!`
const LOOSE_MESSAGE = `В этот раз не получилось, попробуй ещё`

const DEN_FACE = {
  regular: '/rostics_birthday_game/assets/images/den/den_regular.png',
  openLeft: '/rostics_birthday_game/assets/images/den/den_open_left.png',
  openRight: '/rostics_birthday_game/assets/images/den/den_open_right.png',
  openWide: '/rostics_birthday_game/assets/images/den/den_open_wide.png',
  win: '/rostics_birthday_game/assets/images/den/den_win.png',
  sad: '/rostics_birthday_game/assets/images/den/Den_sad.png'
}

const CAT_DANCE = {
    cat_1: '/rostics_birthday_game/assets/images/cat/cat_dance_1.png',
    cat_2: '/rostics_birthday_game/assets/images/cat/cat_dance_2.png',
    cat_3: '/rostics_birthday_game/assets/images/cat/cat_dance_3.png',
    cat_4: '/rostics_birthday_game/assets/images/cat/cat_dance_4.png',
    cat_5: '/rostics_birthday_game/assets/images/cat/cat_dance_5.png',
    cat_6: '/rostics_birthday_game/assets/images/cat/cat_dance_6.png',
    cat_7: '/rostics_birthday_game/assets/images/cat/cat_dance_7.png',
    cat_8: '/rostics_birthday_game/assets/images/cat/cat_dance_8.png',
    win: '/rostics_birthday_game/assets/images/cat/cat_win.png',
    lose: '/rostics_birthday_game/assets/images/cat/cat_lose.png'
  }

const DEN_FACE_ARRAY = ['regular', 'openLeft', 'openRight', 'openWide', 'win']

const CAT_DANCE_ARRAY = ['cat_1', 'cat_2', 'cat_3', 'cat_4', 'cat_5', 'cat_6', 'cat_7', 'cat_8']

const PHOBO_IMAGES = {
  guitar: '/rostics_birthday_game/assets/images/phobos/guitar.png',
  jar: '/rostics_birthday_game/assets/images/phobos/jar.png',
  phobo: '/rostics_birthday_game/assets/images/phobos/phobo.png',
  printer: '/rostics_birthday_game/assets/images/phobos/printer.png'
}

const PHOBO_STYLES = ['guitar', 'phobo', 'jar', 'printer']

export {
        PACMAN_SOUNDS,
        RAMPAGE_SOUNDS,
        VOLUMES,
        CALORY_INCREASE, 
        COOKIES_COUNT,
        TROPHY_COUNT,
        TROPHY_CALORY_INCREASE,
        WALL_COLORS,
        DIFFICULTY_LEVELS,
        WIN_MESSAGE,
        LOOSE_MESSAGE,
        DEN_FACE,
        DEN_FACE_ARRAY,
        GHOST_START_INDEX,
        GHOST_STYLES,
        PHOBO_STYLES,
        PHOBO_IMAGES,
        CAT_DANCE,
        CAT_DANCE_ARRAY
    }
