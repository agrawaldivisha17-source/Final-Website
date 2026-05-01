document.addEventListener("DOMContentLoaded", () => {
  let time = 25 * 60;
  let timer = null;
  let isRunning = false;

  const display = document.getElementById("timer");

  function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    display.textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {
      time--;
      updateDisplay();

      if (time <= 0) {
        clearInterval(timer);
        isRunning = false;
        alert("Time's up!");
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    pauseTimer();
    time = 25 * 60;
    updateDisplay();
  }

  function setMode(minutes) {
    pauseTimer();
    time = minutes * 60;
    updateDisplay();
  }

  document.getElementById("startBtn").onclick = startTimer;
  document.getElementById("pauseBtn").onclick = pauseTimer;
  document.getElementById("resetBtn").onclick = resetTimer;

  document.getElementById("workMode").onclick = () => setMode(25);
  document.getElementById("breakMode").onclick = () => setMode(5);
  document.getElementById("break15Mode").onclick = () => setMode(15);

  updateDisplay();
});