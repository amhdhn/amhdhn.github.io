"use strict";
let allMusics;
const playerSection = document.querySelector(".playerSection");
const customMusicPlayer = document.getElementById("customMusicPlayer");
const musicInfoImg = document.querySelector(".musicInfoImg");
const musicInfoName = document.querySelector(".musicInfoName");
const playBtn = document.querySelector(".playBtn");
const timePassed = document.querySelector(".timePassed");
const totalTime = document.querySelector(".totalTime");
const playerMainDiv = document.querySelector(".playerMainDiv");
const volumeDiv = document.querySelector(".volumeDiv");
const volumeProgress = document.querySelector(".volumeProgress");
const progressDiv = document.querySelector(".progressDiv");
const progressBar = document.querySelector(".progressBar");
const nextMusicBtn = document.querySelector(".nextMusicBtn");
const prevMusicBtn = document.querySelector(".prevMusicBtn");

let playerIndex = 0;
let repeatMode = false;

customMusicPlayer.addEventListener("loadedmetadata", initializeMusic);
window.addEventListener("load", () => {
  playBtn.addEventListener("click", togglePlay);
  customMusicPlayer.addEventListener("timeupdate", updateTimeElapsed);
  customMusicPlayer.addEventListener("ended", musicEndHandler);
  volumeDiv.addEventListener("click", (e) => changeVolumeHandler(e));
  progressDiv.addEventListener("click", (e) => changeTimeHandler(e));
});
function initializeMusic() {
  const time = formatTime(Math.round(customMusicPlayer.duration));
  totalTime.innerText = `${time.minutes}:${time.seconds}`;
  totalTime.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
}
function prepareMusic(element) {
  if (!allMusics) {
    allMusics = document.querySelectorAll(".playListPlayBtn");
    if (allMusics.length === 1) {
      nextMusicBtn.style.display = "none";
      prevMusicBtn.style.display = "none";
    }
  }
  if (!allMusics) {
    return;
  }
  generatePlayerSource(element);
  if (!playerSection.classList.contains("active")) {
    playerSection.classList.add("active");
  }
}
function musicEndHandler() {
  playBtn.classList.remove("play");
  customMusicPlayer.pause();
  if (repeatMode) {
    customMusicPlayer.currentTime = 0;
    playBtn.classList.add("play");
    customMusicPlayer.play();
  } else if (allMusics.length > 1) {
    playerIndex++;
    if (playerIndex < allMusics.length) {
      generatePlayerSource(allMusics[playerIndex]);
    } else {
      playerIndex = 0;
      generatePlayerSource(allMusics[playerIndex], true);
    }
  } else {
    customMusicPlayer.currentTime = 0;
  }
}
function removePlayerSources() {
  const allSoruce = customMusicPlayer.getElementsByTagName("source");
  for (let index = 0; index < allSoruce.length; index++) {
    const source = allSoruce[index];
    source.remove();
  }
}
function generatePlayerSource(element, notPlayNext) {
  removePlayerSources();
  playerIndex = +element.dataset.index;
  let { src, artist, song, cover } = element.dataset;
  const source = document.createElement("source");
  source.src = src;
  musicInfoImg.src = cover;
  musicInfoName.innerText = shortText(`${artist} - ${song}`, 50);
  customMusicPlayer.appendChild(source);
  customMusicPlayer.load();
  !notPlayNext && customMusicPlayer.play();
  notPlayNext && customMusicPlayer.pause();
  playBtn.classList.add("play");
}
function togglePlay() {
  if (customMusicPlayer.paused || customMusicPlayer.ended) {
    customMusicPlayer.play();
    playBtn.classList.add("play");
  } else {
    customMusicPlayer.pause();
    playBtn.classList.remove("play");
  }
}
function shortText(text, len) {
  if (text.length < len) {
    return text;
  }

  return text.slice(0, len) + " ...";
}
function changeTime(newValue, mode) {
  if (mode === "step") {
    const currentTime = customMusicPlayer.currentTime;
    if (newValue > 0 && newValue + currentTime < customMusicPlayer.duration) {
      customMusicPlayer.currentTime = currentTime + newValue;
    } else if (newValue < 0 && currentTime - newValue > 5) {
      customMusicPlayer.currentTime = currentTime + newValue;
    }
  } else {
  }
}
function changeMusic(step) {
  playBtn.classList.remove("play");
  customMusicPlayer.pause();
  customMusicPlayer.currentTime = 0;
  totalTime.innerText = "00:00";
  timePassed.innerText = "00:00";
  playerIndex = playerIndex + step;
  if (playerIndex < 0) {
    playerIndex = allMusics.length - 1;
  } else if (playerIndex >= allMusics.length) {
    playerIndex = 0;
  }
  playBtn.classList.remove("play");
  customMusicPlayer.pause();
  generatePlayerSource(allMusics[playerIndex]);
}
function updateTimeElapsed() {
  const time = formatTime(Math.round(customMusicPlayer.currentTime));

  timePassed.innerText = `${time.minutes}:${time.seconds}`;
  timePassed.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);

  let psTime = customMusicPlayer.currentTime;
  let duration = customMusicPlayer.duration;

  let passedPercent = (psTime * 100) / duration;
  let widthInPx = (progressDiv.offsetWidth * passedPercent) / 100;
  progressBar.style.width = `${widthInPx}px`;
}

function changeVolumeHandler(e) {
  let posX;
  if (e.type == "touchend") {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    posX = touch.pageX;
  } else if (e.type === "click") {
    posX = e.clientX;
  }
  posX = posX - volumeDiv.offsetLeft - playerMainDiv.offsetLeft;
  let volumePercent = (posX * 100) / volumeDiv.offsetWidth;
  customMusicPlayer.volume = volumePercent / 100;
  let widthInPx = (volumeDiv.offsetWidth * volumePercent) / 100;
  volumeProgress.style.width = `${widthInPx}px`;
}
function repeatChangeHandler(element) {
  repeatMode = !repeatMode;
  element.classList.toggle("repeatOn");
}
function changeTimeHandler(e) {
  let posX;
  if (e.type == "touchend") {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    posX = touch.pageX;
  } else if (e.type === "click") {
    posX = e.clientX;
  }
  let volumePercent = (posX * 100) / progressDiv.offsetWidth;
  let newTime = (volumePercent * customMusicPlayer.duration) / 100;
  customMusicPlayer.currentTime = Math.round(newTime);
}
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}
function closeMusicPlayer() {
  playerSection.classList.add("gone");
  customMusicPlayer.pause();
  setTimeout(() => {
    playerSection.classList.remove("active");
    playerSection.classList.remove("gone");
  }, 500);
}
