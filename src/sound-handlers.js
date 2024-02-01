import { PACMAN_SOUNDS } from "../src/const.js";

const playSound = (sound) =>{
    const audioInstance = new Audio(sound);
    audioInstance.play();
}

const soundtrack = new Audio(PACMAN_SOUNDS['soundtrackSound'])

const playSoundtrack = () =>{
    soundtrack.play();
}

const pauseSoundtrack = () => {
    if (soundtrack) {
      soundtrack.pause();
    }
}

export { playSound, playSoundtrack, pauseSoundtrack }
