let a, b, answer, lastAnswer = 0, score = 0, level = 0, lives = 3;
let timeLeft = 10;
let timerInterval;

const LEVEL_RANGES = [
  [0, 4, 9, 9, 18, 18],
  [5, 9, 10, 14, 19, 25],
  [10, 14, 15, 19, 26, 35],
  [15, 19, 20, 25, 36, 50]
];

function getLevelConfig(level) {
  const range = LEVEL_RANGES.find(r => level >= r[0] && level <= r[1]);
  if (!range) return { maxOperand: 9, maxSum: 18 };
  return {
    maxOperand: Math.floor(Math.random() * (range[3] - range[2] + 1)) + range[2],
    maxSum: Math.floor(Math.random() * (range[5] - range[4] + 1)) + range[4]
  };
}

function generateProblem() {
  const config = getLevelConfig(level);
  let maxOperand = config.maxOperand;
  do {
    a = Math.floor(Math.random() * maxOperand) + 1;
    b = Math.floor(Math.random() * maxOperand) + 1;
  } while (a + b > config.maxSum || a + b === lastAnswer);
  answer = a + b;
  lastAnswer = answer;
  document.getElementById('problem').textContent = `${a} + ${b} = ?`;
  document.getElementById('numberInput').value = '';
  resetTimer();
}

function updateLevel() {
  level = Math.floor(score / 5);
  document.getElementById('level').textContent = `Level: ${level}`;
}

function updateLives() {
  document.getElementById('lives').textContent = `Lives: ${lives}`;
  if (lives <= 0) endGame();
}

function updateTimer() {
  document.getElementById('timer').textContent = `Time: ${timeLeft}`;
}

function flashColor(color) {
  const input = document.getElementById('numberInput');
  input.style.backgroundColor = color;
  setTimeout(() => input.style.backgroundColor = '', 500);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = Math.max(7, 10 - Math.floor(level * 0.3));
  updateTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      loseLife();
    }
  }, 1000);
}

function loseLife() {
  lives--;
  updateLives();
  flashColor('lightcoral');
  document.getElementById('numberInput').value = '';
  if (lives > 0) generateProblem();
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById('problem').textContent = 'Game over!';
  document.getElementById('numberInput').classList.add('hidden');
  document.getElementById('final-score').textContent = `Final Score: ${score}`;
  document.getElementById('final-score').classList.remove('hidden');
  document.getElementById('restart-btn').classList.remove('hidden');
  
  // Move back button to center only on gameover
  const returnBtn = document.getElementById('return-btn');
  returnBtn.classList.add('gameover');
}

function restartGame() {
  score = 0;
  level = 0;
  lastAnswer = 0;
  lives = 3;
  timeLeft = 10;
  document.getElementById('score').textContent = 'Score: 0';
  updateLevel();
  updateLives();
  updateTimer();
  document.getElementById('final-score').classList.add('hidden');
  document.getElementById('restart-btn').classList.add('hidden');
  
  // Return button to top-left
  const returnBtn = document.getElementById('return-btn');
  returnBtn.classList.remove('gameover');
  
  document.getElementById('numberInput').classList.remove('hidden');
  document.getElementById('problem').textContent = '';
  generateProblem();
}

document.addEventListener('DOMContentLoaded', function() {
  // Back button defaults to top-left via CSS
  const returnBtn = document.getElementById('return-btn');
  if (returnBtn) returnBtn.classList.remove('gameover');

  generateProblem();
  updateLives();
  updateLevel();
  updateTimer();

  const inputEl = document.getElementById('numberInput');
  inputEl.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (lives <= 0) return;
      const userAnswer = parseInt(this.value);
      if (isNaN(userAnswer)) {
        flashColor('lightcoral');
        this.value = '';
        return;
      }
      if (userAnswer === answer) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        updateLevel();
        flashColor('lightgreen');
        this.value = '';
        generateProblem();
      } else {
        loseLife();
      }
    }
  });

  document.getElementById('restart-btn').addEventListener('click', restartGame);

  // Initial hidden
  document.getElementById('final-score').classList.add('hidden');
  document.getElementById('restart-btn').classList.add('hidden');
});
