const nameSong = document.getElementById("name-song");
const artistSong = document.getElementById("artist-song");
const footerImg = document.getElementById("footer-img");
const duration = document.getElementById("duration");
const currentAudio = document.getElementById("current-audio");
const footerPlayBtn = document.querySelector(".footerPlay");
const currentAudioTime = document.getElementById("current-time");
const progress = document.getElementById("progress-bar");
const volume = document.getElementById("volume");
const time = localStorage.getItem("timeAudio");
const footerImgServer = localStorage.getItem("footerImgServer");
const currentAudioServer = localStorage.getItem("currentAudioServer");
const currentArtisServer = localStorage.getItem("currentArtisServer");
const currentNameSongServer = localStorage.getItem("currentNameSongServer");

//mostro o nascondo aside 2
const hiddenAsideBtn = document.querySelector(".bi-view-list");
hiddenAsideBtn.addEventListener("click", () => {
  const hiddenAside = document.querySelector(".hiddenAside");
  hiddenAsideBtn.classList.toggle("text-success");
  hiddenAside.classList.toggle("d-none");
});

// player nel footer
//recupero i dati della canzone in riproduzione
if (time) {
  currentAudio.currentTime = time;
  footerImg.src = footerImgServer;
  currentAudio.src = currentAudioServer;
  artistSong.innerText = currentArtisServer;
  nameSong.innerText = currentNameSongServer;
}

setInterval(registra, 1000);

function registra() {
  localStorage.setItem("timeAudio", currentAudio.currentTime);
  localStorage.setItem("footerImgServer", footerImg.src);
  localStorage.setItem("currentAudioServer", currentAudio.src);
  localStorage.setItem("currentArtisServer", artistSong.innerText);
  localStorage.setItem("currentNameSongServer", nameSong.innerText);
  currentAudioTime.innerText = Math.round(currentAudio.currentTime);
  progress.value = currentAudio.currentTime;
}

footerPlayBtn.addEventListener("click", () => {
  if (currentAudio.paused) {
    currentAudio.play();
    footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
  } else {
    currentAudio.pause();
    footerPlayBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
  }
});
volume.addEventListener("input", () => {
  currentAudio.volume = volume.value / 100;
  console.log(currentAudio.volume);
});

progress.addEventListener("input", () => {
  currentAudio.currentTime = progress.value;
  console.log(currentAudio.currentTime);
});
