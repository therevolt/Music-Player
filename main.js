import "./style.css";
const AudioContext = window.AudioContext ?? window.webkitAudioContext;
const audioCtx = new AudioContext();
const audioElement = document.getElementById("audio");
const playBtn = document.getElementById("playbtn");
const volumeSlider = document.getElementById("volume");
const seeker = document.getElementById("seeker");
const time = document.getElementById("time");
const duration = document.getElementById("duration");
const speed0 = document.getElementById("speed_0");
const speed1 = document.getElementById("speed_1");
const speed2 = document.getElementById("speed_2");
const speed3 = document.getElementById("speed_3");

speed0.addEventListener("click", () => {
  speed0.className = "active";
  speed1.className = "";
  speed2.className = "";
  speed3.className = "";
});

speed1.addEventListener("click", () => {
  speed0.className = "";
  speed1.className = "active";
  speed2.className = "";
  speed3.className = "";
});

speed2.addEventListener("click", () => {
  speed0.className = "";
  speed1.className = "";
  speed2.className = "active";
  speed3.className = "";
});

speed3.addEventListener("click", () => {
  speed0.className = "";
  speed1.className = "";
  speed2.className = "";
  speed3.className = "active";
});

const audioSource = audioCtx.createMediaElementSource(audioElement);
const convertTime = (time) => {
  let mins = Math.floor(time / 60);
  let secs = Math.floor(time % 60);

  if (mins < 10) {
    mins = `0${mins}`;
  }

  if (secs < 10) {
    secs = `0${secs}`;
  }

  return `${mins}:${secs}`;
};

window.addEventListener("load", () => {
  if (audioCtx.state === "suspend") {
    audioCtx.resume();
  }
  time.textContent = convertTime(audioElement.currentTime);
  duration.textContent = convertTime(audioElement.duration);
});

playBtn.addEventListener("click", (event) => {
  const targetEl = event.target;
  if (audioCtx.state === "suspend") {
    audioCtx.resume();
  }

  if (targetEl.getAttribute("class") === "paused") {
    audioElement.play();
    targetEl.setAttribute("class", "playing");
  } else {
    audioElement.pause();
    targetEl.setAttribute("class", "paused");
  }
});

audioElement.addEventListener("timeupdate", () => {
  if (speed0.className === "active") {
    seeker.value = audioElement.currentTime;
    time.textContent = convertTime(audioElement.currentTime);
  } else if (speed1.className === "active") {
    seeker.value = audioElement.currentTime;
    time.textContent = convertTime(audioElement.currentTime);
  }
});

audioElement.addEventListener("ended", () => {
  playBtn.setAttribute("class", "paused");
});

const gainNode = audioCtx.createGain();
seeker.setAttribute("max", audioElement.duration);
volumeSlider.addEventListener("input", () => {
  gainNode.gain.value = volumeSlider.value;
});

seeker.addEventListener("input", () => {
  audioElement.currentTime = seeker.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);
