const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const gameSound = document.getElementById("gameSound");

let gameLoopInterval = 0;

function jump() {
  dino.classList.add("jump-animation");
  setTimeout(() => dino.classList.remove("jump-animation"), 500);
}

// Event-Listener für Tastaturereignisse
document.addEventListener('keypress', (event) => {
  if (!dino.classList.contains('jump-animation')) {
    jump();
  }
});

// Event-Listener für Touch-Ereignisse auf mobilen Geräten
document.addEventListener('touchstart', (event) => {
  if (!dino.classList.contains('jump-animation')) {
    jump();
  }
});

function startGameLoop() {
  gameLoopInterval = setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'));
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'));
    score.innerText++;

    if (rockLeft < 0) {
      rock.style.display = 'none';
    } else {
      rock.style.display = '';
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame();
    }
  }, 50);
}

function startGame() {
  score.innerText = 0;
  gameContainer.classList.add("background-animation");
  rock.classList.add("rock-animation");
  gameSound.play();
  startGameLoop();
}

function stopGame() {
  gameContainer.classList.remove("background-animation");
  rock.classList.remove("rock-animation");
  clearInterval(gameLoopInterval);
  startButton.disabled = false;
  gameSound.pause();
  gameSound.currentTime = 0;  // Reset the audio to the start
}

startButton.addEventListener("click", () => {
  startGame();
  startButton.disabled = true;
});
