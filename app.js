// Ajouter un podium
// Faire en sorte que les cartes soient visible 5 secondes avant d'etre retrouné et mélangé

const cardArray = [
  {
    name:'aave',
    img:'assets/aave.png',
  },
  {
    name:'binance_coin',
    img:'assets/binance_coin.png'
  },
  {
    name:'bitcoin',
    img:'assets/bitcoin.png'
  },
  {
    name:'chainlink',
    img:'assets/chainlink.png'
  },
  {
    name:'compound',
    img:'assets/compound.png'
  },
  {
    name:'ethereum',
    img:'assets/ethereum.png'
  },
  {
    name:'filecoin',
    img:'assets/filecoin.png'
  },
  {
    name:'litecoin',
    img:'assets/litecoin.png'
  },
  {
    name:'monero',
    img:'assets/monero.png'
  },
  {
    name:'multiversx',
    img:'assets/multiversx.png'
  },
  {
    name:'polygon',
    img:'assets/polygon.png'
  },
  {
    name:'stellar_lumens',
    img:'assets/stellar_lumens.png'
  },
  {
    name:'the_graph',
    img:'assets/the_graph.png'
  },
  {
    name:'vechain',
    img:'assets/vechain.png'
  },
  //2eme exemplaire
  {
    name:'aave',
    img:'assets/aave.png',
  },
  {
    name:'binance_coin',
    img:'assets/binance_coin.png'
  },
  {
    name:'bitcoin',
    img:'assets/bitcoin.png'
  },
  {
    name:'chainlink',
    img:'assets/chainlink.png'
  },
  {
    name:'compound',
    img:'assets/compound.png'
  },
  {
    name:'ethereum',
    img:'assets/ethereum.png'
  },
  {
    name:'filecoin',
    img:'assets/filecoin.png'
  },
  {
    name:'litecoin',
    img:'assets/litecoin.png'
  },
  {
    name:'monero',
    img:'assets/monero.png'
  },
  {
    name:'multiversx',
    img:'assets/multiversx.png'
  },
  {
    name:'polygon',
    img:'assets/polygon.png'
  },
  {
    name:'stellar_lumens',
    img:'assets/stellar_lumens.png'
  },
  {
    name:'the_graph',
    img:'assets/the_graph.png'
  },
  {
    name:'vechain',
    img:'assets/vechain.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

// Demander le nom de l'utilisateur
// const userName = prompt('Enter your name:');
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const roundsDisplay = document.querySelector('#rounds')
const winDisplay = document.querySelector('#moves')
const timeDisplay = document.getElementById('time')
const newGameBtn = document.getElementById("new_game_btn");
const cardsWon = []

let cardsChosen = []
let cardsChosenIds = []
let roundsPlayed = 0;
let newCanvas;
let startTime;
let timeIntervalId;
// 
function saveScore(userName, moves, time) {
  const scores = JSON.parse(localStorage.getItem('memory-game-scores')) || [];
  scores.push({name: userName, moves: moves, time: time});
  scores.sort((a, b) => a.moves - b.moves);
  scores.splice(5);
  localStorage.setItem('memory-game-scores', JSON.stringify(scores));
  showScores();
}
// 
function showScores() {
  const scores = JSON.parse(localStorage.getItem('memory-game-scores')) || [];
  scores.sort((a, b) => a.moves - b.moves);
  const scoresList = document.createElement('ul');
  scores.slice(0, 5).forEach(score => {
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `Name: ${score.name}, Moves: ${score.moves}, Time: ${score.time}`;
    scoresList.appendChild(scoreItem);
  });
  const resultContainer = document.querySelector('#results');
  resultContainer.innerHTML = '';
  resultContainer.appendChild(scoresList);
}

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'assets/blank.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    gridDisplay.append(card)
  }
}

function startTimer() {
  startTime = new Date();
  timeIntervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const timeDisplay = document.getElementById('time');
  const elapsedTime = new Date() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')} minutes`;
  } else {
    timeDisplay.innerText = `${seconds} seconds`;
  }
}
 function endGame() {
  clearInterval(timeIntervalId);
}

createBoard()
startTimer();
showScores();

function flipCard() {
  const cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  console.log(cardsChosen)
  console.log(cardsChosenIds)
  this.setAttribute('src', cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('#grid img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]
  
  if (optionOneId === optionTwoId) {
    cards[optionOneId].setAttribute('src', 'assets/blank.png')
    cards[optionTwoId].setAttribute('src', 'assets/blank.png')
    winDisplay.innerHTML = 'You have click the same images !'
    roundsPlayed++
    roundsDisplay.textContent = roundsPlayed;
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    winDisplay.innerHTML = 'You found a match !'
    cards[optionOneId].setAttribute('src', 'assets/valid.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].setAttribute('src', 'assets/valid.png')
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    roundsPlayed++;
    roundsDisplay.textContent = roundsPlayed;
  } else {
    cards[optionOneId].setAttribute('src', 'assets/blank.png')
    cards[optionTwoId].setAttribute('src', 'assets/blank.png')
    winDisplay.innerHTML = 'Sorry, try again !'
    roundsPlayed++;
    roundsDisplay.textContent = roundsPlayed;
  }
  resultDisplay.textContent = cardsWon.length * 10
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == (cardArray.length / 2)) {
    winDisplay.innerHTML = 'Congratulations, you found them all !';
    endGame()
    // Supprimer le canvas s'il existe
   // if (newCanvas) {
   //   document.body.removeChild(newCanvas)
   // }
    newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;

    document.body.appendChild(newCanvas);
    const explosions = [];

    function createExplosion(x, y) {
      const colors = ['#ffffff', '#20e627'];
      const particleCount = 100;
      const particleSpeed = 5;
      const particleSize = 2;

      for (let i = 0; i < particleCount; i++) {
        const particle = {
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * particleSpeed + 1,
          size: Math.random() * particleSize + 1,
          life: Math.random() * 20 + 10
        };
        explosions.push(particle);
      }
    }
    function drawExplosions() {
      ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);
      for (let i = 0; i < explosions.length; i++) {
        const particle = explosions[i];

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed + 1;
        particle.life--;

        if (particle.life <= 0) {
          explosions.splice(i, 1);
          i--;
        }

        ctx.font = "86px Arial";
        ctx.fillStyle = "#000"; //4CFF03
        ctx.textAlign = "center";
        ctx.scale = 1.2 
        ctx.fillText("BRAVO !", newCanvas.width / 2 + 20 , newCanvas.height / 2 - 20);
      }
      setTimeout(() => {
        const x = Math.random() * newCanvas.width;
        const y = Math.random() * newCanvas.height;
        createExplosion(x, y);
      }, Math.random() * 1000 + 1000);
      requestAnimationFrame(drawExplosions);
    }
    drawExplosions();
  }  
}

newGameBtn.addEventListener('click', () => {
  if (newCanvas) {
    document.body.removeChild(newCanvas);
  }
  resultDisplay.textContent = 0;
  roundsPlayed = 0;
  roundsDisplay.textContent = roundsPlayed;
  winDisplay.innerHTML = '';
  cardsWon.splice(0, cardsWon.length);
  cardArray.sort(() => 0.5 - Math.random());
  gridDisplay.innerHTML = '';
  timeDisplay.innerHTML = '';
  startTimer()
  createBoard();
  checkMatch();
});

