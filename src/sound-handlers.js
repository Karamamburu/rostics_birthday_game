const playSound = (sound) =>{
    const audio = new Audio(sound)
    audio.play()
}

const pauseSound = () => {
    const audio = new Audio()
    audio.pause()
} 

export { playSound, pauseSound }
