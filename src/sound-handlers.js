// let soundtrackInstance = null;

const playSound = (sound) =>{
    const audioInstance = new Audio(sound);
    audioInstance.play();
}

// const playSoundtrack = (soundtrack) =>{
//   soundtrackInstance = new Audio(soundtrack);
//   soundtrackInstance.play();
// }

// const pauseSoundtrack = () => {
//     if (soundtrackInstance) {
//       soundtrackInstance.pause();
//     }
// }

export { playSound }
