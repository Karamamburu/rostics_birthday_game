let audioInstance = null;

const playSound = (sound) =>{
    audioInstance = new Audio(sound);
    audioInstance.play();
}

const pauseSound = () => {
    if (audioInstance) {
        audioInstance.pause();
    }
}
export { playSound, pauseSound }
