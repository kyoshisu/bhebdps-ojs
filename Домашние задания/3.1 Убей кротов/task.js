let dead = 0;
let lost = 0;

function updateCounters() {
  const deadSpan = document.getElementById('dead');
  const lostSpan = document.getElementById('lost');
  deadSpan.textContent = dead;
  lostSpan.textContent = lost;
}

function checkGameOver() {
  if (dead === 10) {
    alert('Победа! Вы убили 10 кротов!');
    resetGame();
  } else if (lost === 5) {
    alert('Поражение! 5 промахов!');
    resetGame();
  }
}

function resetGame() {
  dead = 0;
  lost = 0;
  updateCounters();
}

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);
  
  hole.onclick = function() {
    if (hole.classList.contains('hole_has-mole')) {
      dead++;
      updateCounters();
      checkGameOver();
    } else {
      lost++;
      updateCounters();
      checkGameOver();
    }
  };
}
