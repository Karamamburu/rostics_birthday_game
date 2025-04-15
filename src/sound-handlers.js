import { PACMAN_SOUNDS, VOLUMES } from "/test_game_for_academy/src/const.js";

let isSoundEnabled = true;

const playSound = (sound, volume = 0.75) => {
    if (!isSoundEnabled) return;

    const audioInstance = new Audio(sound);
    audioInstance.volume = volume
    audioInstance.play();
}

const soundtrack = new Audio(PACMAN_SOUNDS['soundtrackSound']);

const playSoundtrack = (volume = 0.5) => {
    if (!isSoundEnabled) return;
    soundtrack.volume = volume
    soundtrack.loop = true;
    soundtrack.play();
}

const pauseSoundtrack = () => {
    if (soundtrack) {
        soundtrack.pause();
    }
}

const toggleSound = (enabled) => {
    isSoundEnabled = enabled;

    if (!enabled) {
        pauseSoundtrack();
    } else if (soundtrack.paused) {
        playSoundtrack(VOLUMES['low']);
    }
}

export { playSound, playSoundtrack, pauseSoundtrack, toggleSound };