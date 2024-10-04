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
// dom libreria
let albumLibreria = [];
const albumLibreriaServerFase2 = JSON.parse(localStorage.getItem("albumLibreria"));
if (albumLibreriaServerFase2) {
  albumLibreriaServerFase2.forEach((element) => {
    const liAlbumLibreria = document.createElement("li");
    liAlbumLibreria.innerHTML = `
      <li class="d-flex align-items-center mb-3">
                <img src="${element.img}" class="me-2 rounded" alt="Cover" width="40" height="40" />
                <div class="playlist-text">
                  <strong>${element.albumTitle}</strong><br />
                </div>
              </li>
      `;
    albumList.appendChild(liAlbumLibreria);
  });
} else {
  localStorage.setItem("albumLibreria", JSON.stringify(albumLibreria));
}

// classe per creare oggetto in memoria libreria
class MyAlbum {
  constructor(_img, _albumTitle) {
    this.img = _img;
    this.albumTitle = _albumTitle;
  }
}

// dom album
const albumCover = document.getElementById("albumCover");
const albumTitle = document.getElementById("albumTitle");
const albumInfo = document.getElementById("albumInfo");
const trackList = document.getElementById("trackList");
const table = document.querySelector("table");
// button
const playBtnC = document.querySelector(".playBtnC");
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

// Url barra
const idBar = new URLSearchParams(location.search);
const albumId = idBar.get("albumId");

// get album
const Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

const getData = () => {
  fetch(Url)
    .then((response) => {
      if (response.ok) {
        console.log(response);

        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((albums) => {
      albumCover.src = albums.cover_medium;
      albumTitle.innerText = albums.title;
      albumInfo.innerHTML = `${albums.artist.name} • ${albums.release_date.substring(0, 4)} • ${albums.nb_tracks} brani, ${(albums.duration / 60).toFixed(
        0
      )} min`;

      const albumSegui = document.getElementById("albumSegui");
      albumSegui.addEventListener("click", () => {
        // creo l'oggetto
        const followAlbum = new MyAlbum(albums.cover_medium, albums.title);
        // pusho
        albumLibreria = albumLibreriaServerFase2;

        albumLibreria.push(followAlbum);
        console.log(albumLibreria);
        // salvo in libreria
        localStorage.setItem("albumLibreria", JSON.stringify(albumLibreria));
        // convertire array
        const albumLibreriaServer = JSON.parse(localStorage.getItem("albumLibreria"));

        // albumList ul contenitore
        const albumList = document.getElementById("albumList");
        albumList.innerHTML = "";

        // for each
        albumLibreriaServer.forEach((element) => {
          const liAlbumLibreria = document.createElement("li");
          liAlbumLibreria.innerHTML = `
            <li class="d-flex align-items-center mb-3">
                      <img src="${element.img}" class="me-2 rounded" alt="Cover" width="40" height="40" />
                      <div class="playlist-text">
                        <strong>${element.albumTitle}</strong><br />
                      </div>
                    </li>
            `;
          albumList.appendChild(liAlbumLibreria);
        });
      });

      console.log(albums.tracks);
      const albumArray = albums.tracks.data;
      albumArray.forEach((singleTrack, i) => {
        const tr = document.createElement("tr");
        tr.classList.add("hoverRiga");
        tr.innerHTML = `
                  <th style="padding: 1rem; width: 30px;" scope="row"><div class="d-flex justify-content-start align-items-center">${
                    i + 1
                  }<img src="../assets/imgs/ImgSpotLoop.gif" height="40" style="margin-block: -1rem;" class="d-none"/></div></th>
                  <td class="hoverTr hoverValue" data-value="${i}">${singleTrack.title}</td>
                  <td>${singleTrack.rank.toString().slice(0, 3)}.${singleTrack.rank.toString().slice(3, 7)}</td>
                  <td>${formatDuration(singleTrack.duration)}</td>`;

        trackList.appendChild(tr);
        let x = 0;
        const playSong = tr.querySelector(".hoverTr");
        playSong.addEventListener("click", () => {
          const hoverValue = tr.querySelector(".hoverValue");
          x = hoverValue.getAttribute("data-value");
          footerImg.src = albums.cover;
          nameSong.innerText = singleTrack.title;
          artistSong.innerText = albums.artist.name;
          duration.innerText = (singleTrack.duration / 60).toFixed(2);

          currentAudio.src = albumArray[x].preview;
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

      let x = 0;

      playBtnC.addEventListener("click", () => {
        if (currentAudio.paused) {
          // Se l'audio è in pausa, inizia la riproduzione
          currentAudio.src = albumArray[x].preview;
          const imgAll = table.querySelectorAll("img");
          console.log(x);

          imgAll.forEach((element) => {
            element.classList.add("d-none");
          });

          imgAll.forEach((element) => {
            element.classList.add("d-none");
          });

          imgAll[x].classList.remove("d-none");
          imgAll[x].classList.add("d-block");
          currentAudio.play();

          playBtnC.classList.remove("bi-play-circle-fill");
          playBtnC.classList.add("bi-pause-circle-fill");
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        } else {
          // Se l'audio è in riproduzione, metti in pausa
          currentAudio.pause();
          playBtnC.classList.remove("bi-pause-circle-fill");
          playBtnC.classList.add("bi-play-circle-fill");
          footerPlayBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
        }
      });

      btnPrevious.addEventListener("click", () => {
        if (x > 0) {
          x--; // Riduci l'indice
          currentAudio.src = albumArray[x].preview;
          console.log(x);

          currentAudio.play();
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
          aggiornaDettagliBrano(); // Funzione per aggiornare dettagli
          const imgAll = table.querySelectorAll("img");

          imgAll.forEach((element) => {
            element.classList.add("d-none");
          });

          imgAll[x].classList.remove("d-none");
          imgAll[x].classList.add("d-block");
        }
      });

      btnNext.addEventListener("click", () => {
        if (x < albumArray.length - 1 && x >= 0) {
          x++; // Aumenta l'indice
          currentAudio.src = albumArray[x].preview;
          console.log(x);

          currentAudio.play();
          footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
          aggiornaDettagliBrano(); // Funzione per aggiornare dettagli
          const imgAll = table.querySelectorAll("img");

          imgAll.forEach((element) => {
            element.classList.add("d-none");
          });

          imgAll[x].classList.remove("d-none");
          imgAll[x].classList.add("d-block");
        }
      });

      // Funzione per aggiornare i dettagli del brano
      function aggiornaDettagliBrano() {
        footerImg.src = albums.cover;
        nameSong.innerText = albumArray[x].title;
        artistSong.innerText = albums.artist.name;
        duration.innerText = `${formatDuration(albumArray[x].duration)}`;
      }
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
// footer btn
footerPlayBtn.addEventListener("click", () => {
  if (currentAudio.paused) {
    currentAudio.play();
    playBtnC.classList.remove("bi-play-circle-fill");
    playBtnC.classList.add("bi-pause-circle-fill");
    footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
  } else {
    currentAudio.pause();
    playBtnC.classList.remove("bi-pause-circle-fill");
    playBtnC.classList.add("bi-play-circle-fill");
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

// duration.innerText = formatDuration(song.duration);
//vecchio codice qui sotto commentato
// duration.innerText = parseFloat((song.duration / 60).toFixed(2));
// s

// color pick
