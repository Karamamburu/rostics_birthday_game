import { playSound, playSoundtrack, pauseSoundtrack, toggleSound } from './src/sound-handlers.js';
import { 
          PACMAN_SOUNDS, 
          RAMPAGE_SOUNDS,
          VOLUMES,
          CALORY_INCREASE, 
          COOKIES_COUNT, 
          TROPHY_CALORY_INCREASE, 
          TROPHY_COUNT, 
          WALL_COLORS,
          DIFFICULTY_LEVELS,
          GHOST_START_INDEX,
          GHOST_STYLES,
          WIN_MESSAGE,
          LOOSE_MESSAGE,
          PHOBO_STYLES,
          CAT_DANCE,
          CAT_DANCE_ARRAY
        } 
        from './src/const.js';

import { getRandomElementOfArray } from './src//util.js'

function updateScaleFactor() {
  const height = window.innerHeight;
  const scale = height / 1000;
  document.documentElement.style.setProperty('--scale-factor', scale);
}

window.addEventListener('load', updateScaleFactor);
window.addEventListener('resize', updateScaleFactor);

const catImages = {};

CAT_DANCE_ARRAY.forEach(cat => {
  const img = new Image();
  img.src = CAT_DANCE[cat];
  catImages[cat] = img;
});

function forceCatToDance() {
  const cat = getRandomElementOfArray(CAT_DANCE_ARRAY);
  catDiv.style.backgroundImage = `url(${catImages[cat].src})`;
}

let seconds = 0;
let timerInterval;

function startTimer() {
  seconds = 0;
  updateTimerDisplay();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  document.getElementById('timer').textContent = `${minutes}:${formattedSeconds}`;
}

let trophyCounter = 1;
let selectedDifficulty = null;
let startTime, endTime;
let moveCounter = 0;

const difficultyButtons = document.querySelectorAll('.difficulty-button')
const modalBackground = document.querySelector('.modalBackground')
const restartButton = document.querySelector('.restart-button');
const catDiv = document.querySelector('.talking-den')
const difficulty = document.querySelector('.selected-difficulty')
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

soundToggle.addEventListener('click', () => {
  const isCurrentlyEnabled = soundIcon.src.includes('sound_on.png');
  
  if (isCurrentlyEnabled) {
      soundIcon.src = "/test_game_for_academy/assets/images/sound_off.png";
      toggleSound(false);
  } else {
      soundIcon.src = "/test_game_for_academy/assets/images/sound_on.png";
      toggleSound(true);
  }
});

catDiv.style.backgroundImage = CAT_DANCE['cat_1']

function sendRequest(body) {
  var response_data;

  $.ajax({
      url: '/test_game_for_academy/api.html',
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify(body),
      async: false,
      error: (xhr, message) => {
          alert("SERVER ERROR\n" + message);
      },
      success: (data) => {
          response_data = data;
      }
  });
  return response_data;
}

let allRatingData = [];

async function displayRatingData() {
  try {
    allRatingData = await sendRequest({
      mode: 'get_rating_data'
    });
    
    filterTableByDifficulty('all');
    
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        button.classList.add('active');
        
        const difficulty = button.dataset.difficulty;
        filterTableByDifficulty(difficulty);
      });
    });
    
  } catch (error) {
    console.error('Ошибка при загрузке данных рейтинга:', error);
  }
}

function filterTableByDifficulty(difficulty) {
  const tableBody = document.querySelector('.ratingTable tbody');
  tableBody.innerHTML = '';
  
  const filteredData = difficulty === 'all' 
    ? allRatingData 
    : allRatingData.filter(player => player.difficulty_level === difficulty);

  const difficultyOrder = { hell: 3, nightmare: 2, normal: 1 };

  const topResults = filteredData.slice(0, 100).sort((a, b) => 
   b.score - a.score || 
   difficultyOrder[b.difficulty_level] - difficultyOrder[a.difficulty_level] || 
   a.durationInSeconds - b.durationInSeconds
);
  let rowNumber = 1;
  topResults.forEach((player, index) => {
    const row = document.createElement('tr');

    const numberCell = document.createElement('td');
    numberCell.textContent = rowNumber;
    
    const nameCell = document.createElement('td');
    nameCell.textContent = player.fullname;
    
    const positionCell = document.createElement('td');
    positionCell.textContent = player.position_name;
    
    const restaurantCell = document.createElement('td');
    restaurantCell.textContent = player.subdivision_name;
    
    const companyCell = document.createElement('td');
    companyCell.textContent = player.partner_name;
    
    const difficultyCell = document.createElement('td');
    difficultyCell.textContent = player.difficulty_level;
    
    const scoreCell = document.createElement('td');
    scoreCell.textContent = player.score;

    const durationCell = document.createElement('td');
    durationCell.textContent = player.duration;
    
    const winCell = document.createElement('td');
    winCell.textContent = player.is_won ? 'Да' : 'Нет';
    
    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(positionCell);
    row.appendChild(restaurantCell);
    row.appendChild(companyCell);
    row.appendChild(difficultyCell);
    row.appendChild(scoreCell);
    row.appendChild(durationCell);
    row.appendChild(winCell);
    
    tableBody.appendChild(row);
    rowNumber++;
  });
}

document.addEventListener('DOMContentLoaded', displayRatingData);

function onDifficultyButtonClick(e) {
  selectedDifficulty = e.target.dataset.difficulty;
  if (selectedDifficulty) {
    initializeGame(selectedDifficulty);
    modalBackground.classList.add('hidden');
  }
  playSoundtrack(VOLUMES['low'])
  difficulty.textContent = selectedDifficulty
  startTime = new Date();
  startTimer()
}

function restartGame() {
  window.location.reload()
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
    1,0,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,4,1,1,1,1,0,1,1,4,1,1,0,1,1,0,1,1,4,1,1,0,1,1,1,1,4,1,
    1,4,1,1,1,1,0,1,1,4,4,4,0,0,0,0,4,4,4,1,1,0,1,1,1,1,4,1,
    1,4,1,1,1,1,0,1,1,4,4,1,1,1,1,1,4,4,4,1,1,0,1,1,1,1,4,1,
    1,4,1,1,1,1,0,1,1,4,4,1,4,4,4,4,1,4,4,1,1,0,1,1,1,1,4,1,
    1,4,4,4,4,4,0,0,0,4,4,1,4,4,4,4,1,4,4,0,0,0,4,4,4,4,4,1,
    1,4,1,1,1,1,0,1,1,4,4,1,1,1,1,1,4,4,4,1,1,0,1,1,1,1,4,1,
    1,4,1,1,1,1,0,1,1,4,4,1,4,4,1,4,4,4,4,1,1,0,1,1,1,1,4,1,
    1,4,1,1,1,1,0,1,1,4,4,1,4,4,4,1,1,4,4,1,1,0,1,1,1,1,4,1,
    1,0,0,0,0,0,0,4,4,0,0,0,4,4,4,4,0,0,0,4,4,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
  // 0 - drumstick
  // 1 - wall
  // 2 - doodle's-lair
  // 3 - bonus
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

  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
        squares[i].style.backgroundImage = `url(/test_game_for_academy/assets/images/phobos/${PHOBO_STYLES[powerPelletIndex]}.png)`;
        squares[i].style.backgroundSize = 'contain';
        squares[i].style.borderRadius = '10px';
        squares[i].style.zIndex = '0';
        squares[i].style.boxSizing = 'border-box';
      
      powerPelletIndex++
      }
    }
  }
  createBoard()


  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add('pac-man')
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
      case 65:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
          ) {
            pacmanCurrentIndex -= 1
            forceCatToDance()
            playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['low'])
            moveCounter++;
          }
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
      case 87:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
          ) {
            pacmanCurrentIndex -= width
            forceCatToDance()
            playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['low'])
            moveCounter++;
          }
        break
      case 39:
      case 68:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        ) {
          pacmanCurrentIndex += 1
          forceCatToDance()
          playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['low'])
          moveCounter++;
        }
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
      case 83:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        ){
          pacmanCurrentIndex += width
          forceCatToDance()
          playSound(PACMAN_SOUNDS['moveSound'], VOLUMES['low'])
          moveCounter++;
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

  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score += CALORY_INCREASE
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
      changeWallsColor()
    }
  }

  function powerPelletEaten() {

    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += TROPHY_CALORY_INCREASE
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
      squares[pacmanCurrentIndex].style.backgroundImage = ''
      
    switch (trophyCounter) {

      case 1:
        playSound(RAMPAGE_SOUNDS['dominating'], VOLUMES['low'])
        break;
      case 2:
        playSound(RAMPAGE_SOUNDS['rampage'], VOLUMES['low'])
        break;
      case 3:
        playSound(RAMPAGE_SOUNDS['unstoppable'], VOLUMES['low'])
        break;
      case 4:
        playSound(RAMPAGE_SOUNDS['godlike'], VOLUMES['low'])
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

  // function unScareGhosts() {
  //   ghosts.forEach(ghost => ghost.isScared = false)
  // }

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

  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
    checkForGameOver()
    }, ghost.speed)
  }

  function showEndGameModal(isWin, rating = null) {
    const modal = document.querySelector('.gameEndModalBackground');
    const title = document.querySelector('.resultTitle');
    const image = document.querySelector('.resultImage');
    const resultNumber = document.querySelector('.resultNumber');
    const resultScore = document.querySelector('.resultScore');
    const resultTime = document.querySelector('.resultTime');
    const resultDifficulty = document.querySelector('.resultDifficulty');
    
    if (isWin) {
      title.textContent = WIN_MESSAGE;
      image.src = '/test_game_for_academy/assets/images/cat/cat_win.png';
    } else {
      title.textContent = LOOSE_MESSAGE;
      image.src = '/test_game_for_academy/assets/images/cat/cat_lose.png';
    }
    
    resultNumber.textContent = rating
    resultScore.textContent = score
    resultTime.textContent = document.getElementById('timer').textContent
    resultDifficulty.textContent = selectedDifficulty.toUpperCase()
    modal.classList.remove('hidden');
    pauseSoundtrack()
    document.querySelector('.restartGameButton').addEventListener('click', restartGame);
    document.querySelector('.closeModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      endTime = new Date();
      pauseSoundtrack()
      playSound(PACMAN_SOUNDS['deadSound'], VOLUMES['half'])
      catDiv.style.backgroundImage = `url(${CAT_DANCE.lose})`;
      restartButton.classList.remove('hidden')
      document.removeEventListener('keyup', movePacman)
      stopTimer()

      const response = sendRequest({
        mode: 'game_over',
        start_time: startTime,
        end_time: endTime,
        difficulty_level: selectedDifficulty,
        score: score,
        is_won: false,
        move_count: moveCounter,
        game_code: "rostics_birthday_game"
      });

      setTimeout(function() { 
        showEndGameModal(false, response?.rating); 
      }, 500);
    }
  }

  function calculateScore() {
    return COOKIES_COUNT * CALORY_INCREASE + TROPHY_COUNT * TROPHY_CALORY_INCREASE
  }
  
  function checkForWin() {
    if (score === calculateScore()) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)

      pauseSoundtrack()
      endTime = new Date();
      playSound(PACMAN_SOUNDS['winSound'], VOLUMES['low'])
      catDiv.style.backgroundImage = `url(${CAT_DANCE.win})`;
      restartButton.classList.remove('hidden')
      stopTimer()
      const response = sendRequest({
        mode: 'game_over',
        start_time: startTime,
        end_time: endTime,
        difficulty_level: selectedDifficulty,
        score: score,
        is_won: true,
        move_count: moveCounter,
        game_code: "rostics_birthday_game"
      });
  
      setTimeout(function() { 
        showEndGameModal(true, response?.rating); 
      }, 500);
    }
  }
}

difficultyButtons.forEach(button => button.addEventListener('click', onDifficultyButtonClick));
restartButton.addEventListener('click', restartGame)