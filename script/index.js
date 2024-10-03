const genericUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const nameSong = document.getElementById("name-song");
const artistSong = document.getElementById("artist-song");
const footerImg = document.getElementById("footer-img");
const duration = document.getElementById("duration");
const currentAudio = document.getElementById("current-audio");
const footerPlayBtn = document.querySelector(".footerPlay");
const currentAudioTime = document.getElementById("current-time");
const homepageSection = document.getElementById("homepage-section");
const searchForm2 = document.getElementById("search-form");
const resultContainer = document.getElementById("song-results");
const hiddenAsideBtn = document.querySelector(".bi-view-list");
const hiddenAside = document.querySelector(".hiddenAside");

// // funzione per la searchBar

searchForm2.addEventListener("submit", (e) => {
  e.preventDefault();
  homepageSection.classList.add("d-none");
});

//nascondo la sidebar
hiddenAsideBtn.addEventListener("click", () => {
  hiddenAsideBtn.classList.toggle("text-success");
  hiddenAside.classList.toggle("d-none");
});
// libreria
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
}
// fine libreria
const getData = (url) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((albums) => {
      console.log("album disponibili", albums);
      const albArray = albums.data;
      // console.log(albArray[0].album.tracklist);

      const element = albArray[Math.floor(Math.random() * 25)];
      const song = new Songs(element.artist.name, element.title_short, element.preview, element.artist.picture, element.duration, element.album.id);

      const popularRow = document.getElementById("popularRow");
      const colRadio = document.createElement("div");
      colRadio.style.width = "140px";
      colRadio.innerHTML = `
        <a href="artist.html?artistId=${song.id}">
          <div class="card h-100 border-0 text-white testH position-relative">
                    <div class="rounded p-2 m-0 badgePlay">
                      <img  src="${song.cover}" class="img-fluid rounded" alt="..." />
                     <a class="play-song-btn" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="#63D566"
                            class="bi bi-play-circle-fill position-absolute"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                          </svg>
                      </a>
                    </div>
                    <div class="card-body pt-0">
                      <p class="card-text overflow-hidden text-white" style="max-height: 3rem">${song.artist}</p>
                    </div>
                  </div>
        </a>
        `;

      popularRow.appendChild(colRadio);

      const element2 = albArray[Math.floor(Math.random() * 25)];
      const song2 = new Songs(
        element2.artist.name,
        element2.title_short,
        element2.preview,
        element2.album.cover,
        element2.duration,
        element2.album.id,
        element2.album.title
      );

      const almbusRow = document.getElementById("almbusRow");
      const colAlbum = document.createElement("div");
      colAlbum.style.width = "140px";
      colAlbum.innerHTML = `

    <a href="album.html?albumId=${song2.id}">
      <div class="card h-100 border-0 text-white testH position-relative">
                      <div class="rounded p-2 m-0 badgePlay ">
                          <img src="${song2.cover}" class="img-fluid rounded" alt="..." />
                         <a class="play-song-btn" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="#63D566"
                            class="bi bi-play-circle-fill position-absolute mb-3 translate-middle-y"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                          </svg>
                      </a>
                      </div>
                      <div class="card-body pt-0">
                          <h6>${song2.artist}</h6>
                          <p class="card-text overflow-hidden text-secondary" style="max-height: 1.5rem">${song2.albumTitle}</p>
                      </div>
                      </div>
    </a>
                    `;
      almbusRow.appendChild(colAlbum);
      //funzione per il bottone play
      const playSongBtn = colRadio.querySelector(".play-song-btn");

      playSongBtn.addEventListener("click", (e) => {
        e.preventDefault();
        footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        nameSong.innerText = song.title_short;
        artistSong.innerText = song.artist;
        footerImg.src = song.cover;
        duration.innerText = `${formatDuration(song.duration)}`;
        currentAudio.src = song.preview;
        currentAudio.play();
      });

      //album row
      const playSongBtn1 = colAlbum.querySelector(".play-song-btn");
      playSongBtn1.addEventListener("click", (e) => {
        e.preventDefault();
        hiddenAside.classList.remove("d-none");
        hiddenAsideBtn.classList.toggle("text-success");
        footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        nameSong.innerText = song2.title_short;
        artistSong.innerText = song2.artist;
        footerImg.src = song2.cover;
        currentAudio.src = song2.preview;
        currentAudio.play();

        // test album track

        const urlTrack = `https://striveschool-api.herokuapp.com/api/deezer/album/${song2.id}`;
        function getTrack() {
          fetch(urlTrack)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Errore nel recupero dei dati");
              }
            })
            .then((trackList) => {
              ulCoda.innerHTML = "";
              console.log("trackList", trackList.tracks.data);
              const listArray = trackList.tracks.data;
              listArray.forEach((singleTrack) => {
                const li = document.createElement("li");
                li.innerHTML = `
            <li class="d-flex align-items-center mb-3">
                      <img src="${singleTrack.album.cover}" class="me-2 rounded" alt="Cover" width="40" height="40" />
                      <div class="playlist-text">
                        <strong>${singleTrack.title}</strong><br />
                      </div>
                    </li>
            `;

                console.log(li);
                ulCoda.appendChild(li);

                const btnradio1 = document.getElementById("btnradio1");

                btnradio1.addEventListener("click", () => {
                  window.location.href = `album.html?albumId=${song2.id}`;
                });
              });
            })
            .catch((err) => {
              console.log("ERROR", err);
            });
        }

        getTrack();
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const artisti = [
  "tizianoferro",
  "queen",
  "pino",
  "lazza",
  "weeknd",
  "travis",
  "Eminem",
  "Annalisa",
  "Billie",
  "post",
  "fedez",
  "lady",
  "adele",
  "guns",
  "greenday",
  "linkin",
  "gazzelle",
  "ironmaiden",
  "coez",
  "metallica",
  "blink",
  "slipknot",
  "offspring",
  "rosevillain",
  "achille",
  "irama",
  "ultimo",
  "geolier",
  "rancore",
  "imaginedragons",
  "mengoni",
  "cristinadavena",
  "giorgiovanni",
  "gigidag",
  "eiffel",
  "muse",
  "giggione",
  "ligabue",
  "corinne",
  "vasco",
  "guccini",
  "deandre",
  "ivangraziani",
  "tananai",
  "maneskin",
  "giancane",
  "mammoudh",
  "gali",
  "lunapop",
  "883",
  "angelina",
  "cremonini",
  "litfiba",
  "coldpaly"
];

getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);
getData(genericUrl + artisti[Math.floor(Math.random() * artisti.length)]);

class Songs {
  constructor(_artist, _title_short, _preview, _cover, _duration, _id, _albumTitle) {
    this.artist = _artist;
    this.title_short = _title_short;
    this.preview = _preview;
    this.cover = _cover;
    this.duration = _duration;
    this.id = _id;
    this.albumTitle = _albumTitle;
  }
}

// funzioni media player

// pulsante Play nel footer

footerPlayBtn.addEventListener("click", () => {
  if (currentAudio.paused) {
    currentAudio.play();
    footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
  } else {
    currentAudio.pause();
    footerPlayBtn.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
  }
});

const progress = document.getElementById("progress-bar");
const volume = document.getElementById("volume");

volume.addEventListener("input", () => {
  currentAudio.volume = volume.value / 100;
});

progress.addEventListener("input", () => {
  currentAudio.currentTime = progress.value;
});

const time = localStorage.getItem("timeAudio");
const footerImgServer = localStorage.getItem("footerImgServer");
const currentAudioServer = localStorage.getItem("currentAudioServer");
const currentArtisServer = localStorage.getItem("currentArtisServer");
const currentNameSongServer = localStorage.getItem("currentNameSongServer");

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
  currentAudioTime.innerText = `00:${Math.round(currentAudio.currentTime)}`;
  progress.value = currentAudio.currentTime;
}

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

document.getElementById("searchIcon").addEventListener("click", (e) => {
  e.preventDefault();
  let searchButton = document.querySelector(".searchButton");
  if (!searchButton.classList.contains("show")) {
    searchButton.classList.remove("d-none");
    searchButton.classList.add("d-block");
    const aside1 = document.getElementById("aside1");
    aside1.classList.add("d-none");
    homepageSection.classList.add("d-none");
    searchButton.focus();
  } else {
    searchButton.classList.remove("show");
  }
});

duration.innerText = formatDuration(song.duration);
//vecchio codice qui sotto commentato
// duration.innerText = parseFloat((song.duration / 60).toFixed(2));
currentAudio.src = song.preview;
currentAudio.play();
