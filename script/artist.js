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
// dom album
const albumCover = document.getElementById("albumCover");
const albumTitle = document.getElementById("albumTitle");
const albumInfo = document.getElementById("albumInfo");
const trackList = document.getElementById("trackList");
const table = document.querySelector("table");
// dom artist
const artistCover = document.getElementById("artistCover");
const artistName = document.getElementById("artistName");
const fans = document.getElementById("fans");
// button
const playBtnC = document.querySelector(".playBtnC");
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");
// Url barra

const idBar = new URLSearchParams(location.search);
const artistId = idBar.get("artistId");

// (genericUrl + "/" + artistId)

// get artist
const genericUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${artistId}`;

const getData = () => {
  fetch(genericUrl)
    .then((response) => {
      if (response.ok) {
        console.log(response);

        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((albums) => {
      console.log("album disponibili", albums);
      const songsArray = albums.tracks.data;
      const albumArray = albums.tracks.data;
      artistCover.src = albums.artist.picture_medium;
      artistName.innerText = albums.artist.name;
      fans.innerText = `${albums.fans.toString().slice(0, 3)}.${albums.fans.toString().slice(3, 7)}`;
      songsArray.forEach((singleTrack, i) => {
        const tr = document.createElement("tr");
        tr.classList.add("hoverRiga");
        tr.innerHTML = `
                  <th style="padding: 1rem; width: 30px;" scope="row"><div class="d-flex justify-content-start align-items-center" id="songNumber">
                  ${i + 1}
                  <img src="../assets/imgs/ImgSpotLoop.gif" height="40" style="margin-block: -1rem;" class="d-none"/></div></th>
                  <td class="hoverTr hoverValue" data-value="${i}">${singleTrack.title}</td>                
                  <td>${formatDuration(singleTrack.duration)}</td>`;

        trackList.appendChild(tr);
        let x = 0;
        const playSong = tr.querySelector(".hoverTr");
        playSong.addEventListener("click", () => {
          const hoverValue = tr.querySelector(".hoverValue");
          x = hoverValue.getAttribute("data-value");
          console.log(x);
          footerImg.src = albums.cover;
          nameSong.innerText = singleTrack.title;
          artistSong.innerText = albums.artist.name;
          duration.innerText = (singleTrack.duration / 60).toFixed(2);

          currentAudio.src = albumArray[i].preview;
          currentAudio.play();
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;

          // controlli footer dalla songList
          btnPrevious.addEventListener("click", () => {
            x--;
            console.log(x);
            currentAudio.src = albumArray[x].preview;
            currentAudio.play();
            footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
            footerImg.src = albums.cover;
            nameSong.innerText = albumArray[x].title;
            artistSong.innerText = albums.artist.name;
            duration.innerText = `${formatDuration(singleTrack.duration)}`;
          });

          btnNext.addEventListener("click", () => {
            x++;
            console.log(x);
            currentAudio.src = albumArray[x].preview;
            currentAudio.play();
            footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
            footerImg.src = albums.cover;
            nameSong.innerText = albumArray[x].title;
            artistSong.innerText = albums.artist.name;
            duration.innerText = `${formatDuration(singleTrack.duration)}`;
          });

          const imgAll = table.querySelectorAll("img");

          imgAll.forEach((element) => {
            element.classList.add("d-none");
          });

          const img = tr.querySelector("img");
          img.classList.remove("d-none");
          img.classList.add("d-block");
        });
      });

      playBtnC.addEventListener("click", () => {
        let x = 0;
        btnPrevious.addEventListener("click", () => {
          x--;
          currentAudio.src = albumArray[x].preview;
          currentAudio.play();
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        });

        btnNext.addEventListener("click", () => {
          x++;
          currentAudio.src = albumArray[x].preview;
          currentAudio.play();
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        });

        console.log(albumArray[x].preview);
        currentAudio.src = albumArray[x].preview;
        currentAudio.play();
        footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        footerImg.src = albums.cover;
        nameSong.innerText = albumArray[x].title;
        artistSong.innerText = albums.artist.name;
        duration.innerText = `${formatDuration(singleTrack.duration)}`;
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

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
});

progress.addEventListener("input", () => {
  currentAudio.currentTime = progress.value;
});

getData();

const formatDuration = (seconds) => {
  //minuti
  const minutes = Math.floor(seconds / 60);
  //secondi che rimangono dalla trasformazione in minuti
  const remainingSeconds = Math.floor(seconds % 60);
  //ternary per prendere 2 cifre di secondi
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

//progress bar da sistemare
const audio = document.getElementById("current-audio");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const volumeControl = document.getElementById("volume");

// Quando l'audio carica, imposta la durata
audio.addEventListener("loadedmetadata", () => {
  progressBar.max = Math.floor(audio.duration);
  durationElement.textContent = formatTime(audio.duration);
});

// Aggiorna la barra di avanzamento e il tempo corrente dell'audio
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  updateProgressBarColor(progressBar);
});

// Funzione per aggiornare il colore verde della barra di avanzamento
function updateProgressBarColor(bar) {
  const value = (bar.value / bar.max) * 100;
  bar.style.background = `linear-gradient(to right, green ${value}%, white ${value}%)`; // Sfuma da verde a bianco
}

// Permetti all'utente di modificare la posizione di riproduzione
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
  updateProgressBarColor(progressBar);
});

// Gestione del volume e aggiornamento della barra del volume
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
  updateProgressBarColor(volumeControl);
});

// Funzione per formattare il tempo in minuti e secondi
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
//fine progress bar
