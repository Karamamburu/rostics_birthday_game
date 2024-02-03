import { playSound, playSoundtrack, pauseSoundtrack } from './src/sound-handlers.js';
import { 
          PACMAN_SOUNDS, 
          RAMPAGE_SOUNDS,
          VOLUMES,
          CALORY_INCREASE, 
          COOKIES_COUNT, 
          TROPHY_CALORY_INCREASE, 
          TROPHY_COUNT, 
          WALL_COLORS,
          DEN_FACE,
          DEN_FACE_ARRAY,
          DIFFICULTY_LEVELS,
          GHOST_START_INDEX,
          GHOST_STYLES,
          WIN_MESSAGE,
          LOOSE_MESSAGE,
          PHOBO_STYLES,
          PHOBO_IMAGES
        } 
        from './src/const.js';

import { getRandomElementOfArray } from './src//util.js'

let trophyCounter = 1;
let selectedDifficulty = null;

const difficultyButtons = document.querySelectorAll('.difficulty-button')
const modalBackground = document.querySelector('.modalBackground')
const restartButton = document.querySelector('.restart-button');
const denDiv = document.querySelector('.talking-den')
const difficulty = document.querySelector('.selected-difficulty')

denDiv.style.backgroundImage = DEN_FACE['regular']

function onDifficultyButtonClick(e) {
  selectedDifficulty = e.target.dataset.difficulty;
  if (selectedDifficulty) {
    initializeGame(selectedDifficulty);
    modalBackground.classList.add('hidden');
  }
  playSoundtrack(VOLUMES['low'])
  difficulty.textContent = selectedDifficulty

}

function restartGame() {
  window.location.reload()
}

function forceDenToTalk() {
  const denFace = getRandomElementOfArray(DEN_FACE_ARRAY);
  denDiv.style.backgroundImage = `url(${DEN_FACE[denFace]})`;
}

function initializeGame(difficulty) {
  const scoreDisplay = document.getElementById('score')
  const width = 28
  let score = 0
  const grid = document.querySelector('.grid')
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,4,1,1,1,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,2,1,2,1,2,2,4,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,1,2,1,1,1,4,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,4,2,1,2,2,2,1,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,1,1,1,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const countCellsByGroups = (layout) => {
    const groups = {
      pacDots: 0,
      walls: 0,
      ghostLairs: 0,
      powerPellets: 0,
      empty: 0
    }
    for (let i of layout) {
      if (i === 0) {
        groups.pacDots++
      } else if (i === 1) {
        groups.walls++
      } else if (i === 2) {
        groups.ghostLairs++
      } else if (i === 3) {
        groups.powerPellets++
      } else if (i === 4) {
        groups.empty++
      }
    }
  }

  const squares = []
  let powerPelletIndex = 0;

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to the board
      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
        squares[i].style.backgroundImage = `url(../assets/images/phobos/${PHOBO_STYLES[powerPelletIndex]}.png)`;
        squares[i].style.backgroundSize = 'contain';
        squares[i].style.borderRadius = '10px';
        squares[i].style.zIndex = '0';
        squares[i].style.boxSizing = 'border-box';
      
      powerPelletIndex++
      }
    }
  }
  createBoard()


  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add('pac-man')
  //get the coordinates of pacman on the grid with X and Y axis
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  // console.log(getCoordinates(pacmanCurrentIndex))

  //move pacman
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
          ) {
            pacmanCurrentIndex -= 1
            playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['medium'])
          }
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
          ) {
            pacmanCurrentIndex -= width
            playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['medium'])
          }
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        ) {
          pacmanCurrentIndex += 1
          playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['medium'])
        }
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        ){
          pacmanCurrentIndex += width
          playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['medium'])
        }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman)

  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score += CALORY_INCREASE
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
      changeWallsColor()
      forceDenToTalk()
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {

    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += TROPHY_CALORY_INCREASE
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
      squares[pacmanCurrentIndex].style.backgroundImage = ''
      
    switch (trophyCounter) {

      case 1:
        playSound(RAMPAGE_SOUNDS['dominating'], VOLUMES['high'])
        break;
      case 2:
        playSound(RAMPAGE_SOUNDS['rampage'], VOLUMES['high'])
        break;
      case 3:
        playSound(RAMPAGE_SOUNDS['unstoppable'], VOLUMES['high'])
        break;
      case 4:
        playSound(RAMPAGE_SOUNDS['godlike'], VOLUMES['high'])
        break;
    }
      trophyCounter++
    }
  }

  function changeWallsColor() {
    const randomColor = getRandomElementOfArray(WALL_COLORS);
    
    squares.forEach(square => {
      if (square.classList.contains('wall')) {
        WALL_COLORS.forEach(color => {
          square.classList.remove(color);
        });
  
        square.classList.add(randomColor);
      }
    });
  }

  //make the ghosts stop flashing
  // function unScareGhosts() {
  //   ghosts.forEach(ghost => ghost.isScared = false)
  // }

  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }
  const ghosts = [];

  function createGhosts() {
    const speed = DIFFICULTY_LEVELS[selectedDifficulty].speed;
    const ghostsCount = DIFFICULTY_LEVELS[selectedDifficulty].ghostsCount;
  
    for (let i = 0; i < ghostsCount; i++) {
        const randomClass = getRandomElementOfArray(GHOST_STYLES);
        const randomIndex = getRandomElementOfArray(GHOST_START_INDEX);
        const newGhost = new Ghost(randomClass, randomIndex, speed);
        ghosts.push(newGhost);
    }
}
  createGhosts();

  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
    checkForGameOver()
    }, ghost.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      pauseSoundtrack()
      playSound(PACMAN_SOUNDS['deadSound'])
      denDiv.style.backgroundImage = `url(${DEN_FACE.sad})`;
      restartButton.classList.remove('hidden')
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert(LOOSE_MESSAGE) }, 500)
    }
  }

  function calculateScore() {
    return COOKIES_COUNT * CALORY_INCREASE + TROPHY_COUNT * TROPHY_CALORY_INCREASE
  }
  
  function checkForWin() {
    if (score === calculateScore()) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ 
        alert(WIN_MESSAGE)
      }, 500)

      pauseSoundtrack()
      playSound(PACMAN_SOUNDS['winSound'], VOLUMES['medium'])
      denDiv.style.backgroundImage = `url(${DEN_FACE.win})`;
      restartButton.classList.remove('hidden')
    }
  }
}

difficultyButtons.forEach(button => button.addEventListener('click', onDifficultyButtonClick));
restartButton.addEventListener('click', restartGame)