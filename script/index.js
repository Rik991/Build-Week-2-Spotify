const genericUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const nameSong = document.getElementById("name-song");
const artistSong = document.getElementById("artist-song");
const footerImg = document.getElementById("footer-img");
const duration = document.getElementById("duration");
const currentAudio = document.getElementById("current-audio");
const footerPlayBtn = document.querySelector(".footerPlay");
const currentAudioTime = document.getElementById("current-time");

const hiddenAsideBtn = document.querySelector(".bi-view-list");
hiddenAsideBtn.addEventListener("click", () => {
  const hiddenAside = document.querySelector(".hiddenAside");
  hiddenAsideBtn.classList.toggle("text-success");
  hiddenAside.classList.toggle("d-none");
});

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
      const element = albArray[Math.floor(Math.random() * 25)];
      const song = new Songs(element.artist.name, element.title_short, element.preview, element.album.cover, element.duration, element.album.id);

      const popularRow = document.getElementById("popularRow");
      const colRadio = document.createElement("div");
      colRadio.style.width = "140px";
      colRadio.innerHTML = `
        <a href="artist.html?artistId=${song.id}">
          <div class="card h-100 border-0 text-white testH position-relative">
                    <div class="rounded p-2 m-0 badgePlay">
                      <img src="${song.cover}" class="img-fluid rounded" alt="..." />
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
                      <p class="card-text overflow-hidden text-white" style="max-height: 3rem">${song.title_short}</p>
                    </div>
                  </div>
        </a>
        `;

      popularRow.appendChild(colRadio);

      const element2 = albArray[Math.floor(Math.random() * 25)];
      const song2 = new Songs(element2.artist.name, element2.title_short, element2.preview, element2.album.cover, element2.duration, element2.album.id);

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
                          <p class="card-text overflow-hidden text-secondary" style="max-height: 1.5rem">${song2.title_short}</p>
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
        footerPlayBtn.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        nameSong.innerText = song2.title_short;
        artistSong.innerText = song2.artist;
        footerImg.src = song2.cover;
        currentAudio.src = song2.preview;
        currentAudio.play();
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
  "greenday"
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
  constructor(_artist, _title_short, _preview, _cover, _duration, _id) {
    this.artist = _artist;
    this.title_short = _title_short;
    this.preview = _preview;
    this.cover = _cover;
    this.duration = _duration;
    this.id = _id;
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

duration.innerText = formatDuration(song.duration);
//vecchio codice qui sotto commentato
// duration.innerText = parseFloat((song.duration / 60).toFixed(2));
currentAudio.src = song.preview;
currentAudio.play();

//search-bar su navbar

// const searchForm = document.getElementById("search-form");
// const searchInput = document.getElementById("search-input");
// const resultsContainer = document.getElementById("search-results");

// // Funzione per la ricerca dei brani dall'API Deezer
// const searchSongs = (query) => {
//   const searchUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

//   fetch(searchUrl)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Errore nel recupero dei dati");
//       }
//     })
//     .then((data) => {
//       displaySearchResults(data.data);
//     })
//     .catch((error) => {
//       console.error("Errore nella ricerca:", error);
//     });
// };

// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const query = searchInput.value;
//   if (query) {
//     searchSongs(query); // Esegui la ricerca
//   }
// });

// const popularArtistsRow = document.getElementById("popularRow");
// const popularAlbumsRow = document.getElementById("almbusRow");

// const displaySearchResults = (songs) => {
//   popularArtistsRow.innerHTML = "";
//   popularAlbumsRow.innerHTML = "";

//   songs.forEach((song) => {
//     const songItem = document.createElement("div");
//     songItem.classList.add("col", "mb-4");

//     songItem.innerHTML = `
//       <div class="card h-100 border-0 text-white bg-dark position-relative">
//         <div class="rounded p-2 m-0 badgePlay">
//           <img src="${song.album.cover_medium}" class="img-fluid rounded" alt="${song.title}" />
//           <a class="play-song-btn" href="#" data-preview="${song.preview}" data-title="${song.title}" data-artist="${song.artist.name}" data-cover="${song.album.cover_medium}">
//             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#63D566" class="bi bi-play-circle-fill position-absolute" viewBox="0 0 16 16">
//               <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
//             </svg>
//           </a>
//         </div>
//         <div class="card-body pt-0">
//           <h6>${song.title}</h6>
//           <p class="text-secondary mb-0">${song.artist.name}</p>
//         </div>
//       </div>
//     `;

//     popularArtistsRow.appendChild(songItem);

//     const playSongBtn = songItem.querySelector(".play-song-btn");
//     playSongBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       const previewUrl = e.target.getAttribute("data-preview");
//       const songTitle = e.target.getAttribute("data-title");
//       const songArtist = e.target.getAttribute("data-artist");
//       const songCover = e.target.getAttribute("data-cover");

//       playSong(previewUrl, songTitle, songArtist, songCover);
//     });
//   });
// };
