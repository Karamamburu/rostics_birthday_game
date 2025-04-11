const PACMAN_SOUNDS = {
    moveSound: '/test_game_for_academy/assets/sounds/pacman_move.mp3',
    winSound: '/test_game_for_academy/assets/sounds/pacman_win.mp3',
    deadSound: '/test_game_for_academy/assets/sounds/pacman_death.mp3',
    soundtrackSound: '/test_game_for_academy/assets/sounds/pacman_soundtrack.mp3'
}

const RAMPAGE_SOUNDS = {
    dominating: '/test_game_for_academy/assets/sounds/dominating.mp3',
    rampage: '/test_game_for_academy/assets/sounds/rampage.mp3',
    unstoppable: '/test_game_for_academy/assets/sounds/unstoppable.mp3',
    godlike: '/test_game_for_academy/assets/sounds/godlike.mp3'
}

const VOLUMES = {
  high: 1,
  medium: 0.75,
  half: 0.5,
  low: 0.25
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
        speed: 150,
        ghostsCount: 6
    },
    hell: {
        speed: 100,
        ghostsCount: 8
    },
}

const GHOST_START_INDEX = [348, 351, 376, 379]
const GHOST_STYLES = ['ghost-apple', 'ghost-avocado', 'ghost-broccoli', 'ghost-cucumber', 'ghost-lemon', 'ghost-orange', 'ghost-pumpkin', 'ghost-tomato']

const WIN_MESSAGE = `С ДР, крч! Ты победил!`
const LOOSE_MESSAGE = `О! Какой ужас! Памагите! Я замутил макбук, а игру DenKman пройти не смог...`

const DEN_FACE = {
  regular: '/test_game_for_academy/assets/images/den/den_regular.png',
  openLeft: '/test_game_for_academy/assets/images/den/den_open_left.png',
  openRight: '/test_game_for_academy/assets/images/den/den_open_right.png',
  openWide: '/test_game_for_academy/assets/images/den/den_open_wide.png',
  win: '/test_game_for_academy/assets/images/den/den_win.png',
  sad: '/test_game_for_academy/assets/images/den/Den_sad.png'
}

const DEN_FACE_ARRAY = ['regular', 'openLeft', 'openRight', 'openWide', 'win']

const PHOBO_IMAGES = {
  guitar: '/test_game_for_academy/assets/images/phobos/guitar.png',
  jar: '/test_game_for_academy/assets/images/phobos/jar.png',
  phobo: '/test_game_for_academy/assets/images/phobos/phobo.png',
  printer: '/test_game_for_academy/assets/images/phobos/printer.png'
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
        PHOBO_IMAGES
    }
