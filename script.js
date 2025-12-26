const timeEl = document.getElementById("time");
const fastestEl = document.getElementById("fastest");
const slowestEl = document.getElementById("slowest");

const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsEl = document.getElementById("laps");

let startTime = 0;
let elapsed = 0;
let timer = null;
let laps = [];

function format(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  let seconds = String(totalSeconds % 60).padStart(2, "0");
  let cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${cs}`;
}

startBtn.addEventListener("click", () => {
  if (!timer) {
    startTime = Date.now() - elapsed;
    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      timeEl.textContent = format(elapsed);
    }, 10);

    startBtn.textContent = "Stop";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    clearInterval(timer);
    timer = null;
    startBtn.textContent = "Start";
    lapBtn.disabled = true;
  }
});

lapBtn.addEventListener("click", () => {
  laps.push(elapsed);
  renderLaps();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  elapsed = 0;
  laps = [];

  timeEl.textContent = "00:00:00";
  fastestEl.textContent = "--:--:--";
  slowestEl.textContent = "--:--:--";
  lapsEl.innerHTML = "";

  startBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});

function renderLaps() {
  lapsEl.innerHTML = "";

  const fastest = Math.min(...laps);
  const slowest = Math.max(...laps);

  fastestEl.textContent = format(fastest);
  slowestEl.textContent = format(slowest);

  laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1} — ${format(lap)}`;
    lapsEl.appendChild(li);
  });
}
