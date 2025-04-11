import { PACMAN_SOUNDS } from "/test_game_for_academy/src/const.js";

const playSound = (sound, volume = 0.75) => {
    const audioInstance = new Audio(sound);
    audioInstance.volume = volume;
    audioInstance.play();
}

const soundtrack = new Audio(PACMAN_SOUNDS['soundtrackSound'])

const playSoundtrack = (volume = 0.5) => {
    soundtrack.volume = volume;
    soundtrack.play();
}

const pauseSoundtrack = () => {
    if (soundtrack) {
      soundtrack.pause();
    }
}

export { playSound, playSoundtrack, pauseSoundtrack }
