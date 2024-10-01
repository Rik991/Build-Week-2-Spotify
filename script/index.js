const genericUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const nameSong = document.getElementById("name-song");
const artistSong = document.getElementById("artist-song");
const footerImg = document.getElementById("footer-img");
const duration = document.getElementById("duration");
const currentAudio = document.getElementById("current-audio");
const footerPlayBtn = document.querySelector(".footerPlay");

const hiddenAsideBtn = document.querySelector(".bi-view-list");
hiddenAsideBtn.addEventListener("click", () => {
  const hiddenAside = document.querySelector(".hiddenAside");
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
      const song = new Songs(element.artist.name, element.title_short, element.preview, element.album.cover, element.duration);

      const popularRow = document.getElementById("popularRow");
      const colRadio = document.createElement("div");
      colRadio.style.width = "140px";
      colRadio.innerHTML = `
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
        `;

      popularRow.appendChild(colRadio);

      const element2 = albArray[Math.floor(Math.random() * 25)];
      const song2 = new Songs(element2.artist.name, element2.title_short, element2.preview, element2.album.cover, element2.duration);

      const almbusRow = document.getElementById("almbusRow");
      const colAlbum = document.createElement("div");
      colAlbum.style.width = "140px";
      colAlbum.innerHTML = `
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
                        <h5>${song2.artist}</h5>
                        <p class="card-text overflow-hidden text-secondary" style="max-height: 1.5rem">${song2.title_short}</p>
                    </div>
                    </div>
                    `;
      almbusRow.appendChild(colAlbum);
      //funzione per il bottone play
      const playSongBtn = colRadio.querySelector(".play-song-btn");
      playSongBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nameSong.innerText = song.title_short;
        artistSong.innerText = song.artist;
        footerImg.src = song.cover;
        duration.innerText = parseFloat((song.duration / 60).toFixed(2));
        currentAudio.src = song.preview;
        currentAudio.play();
      });
      //album row
      const playSongBtn1 = colAlbum.querySelector(".play-song-btn");
      playSongBtn1.addEventListener("click", (e) => {
        e.preventDefault();
        nameSong.innerText = song2.title_short;
        artistSong.innerText = song2.artist;
        footerImg.src = song2.cover;
        duration.innerText = parseFloat((song2.duration / 60).toFixed(2));
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
  "greenday",
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
  constructor(_artist, _title_short, _preview, _cover, _duration) {
    this.artist = _artist;
    this.title_short = _title_short;
    this.preview = _preview;
    this.cover = _cover;
    this.duration = _duration;
  }
}

//funzione pulsante Play nel footer FUNZIONA SOLO IL FOOTER, DEVE ESSERE AGGIORNATO AL PLAY SULLE CARD. NON CI SONO RIUSCITA
const footerPlayIcon = document.querySelector(".footerPlayIcon");
footerPlayBtn.addEventListener("click", () => {
  if (currentAudio.paused) {
    currentAudio.play();
    footerPlayIcon.classList.remove("bi-play-circle-fill"); // Rimuovi l'icona di play
    footerPlayIcon.classList.add("bi-pause-circle-fill"); // Aggiungi l'icona di pausa
  } else {
    currentAudio.pause();
    footerPlayIcon.classList.remove("bi-pause-circle-fill"); // Rimuovi l'icona di pausa
    footerPlayIcon.classList.add("bi-play-circle-fill"); // Aggiungi l'icona di play
  }
});

// footerPlayBtn.addEventListener("click", () => {
//   if (currentAudio.paused) {
//     currentAudio.play();
//     footerPlayBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>'; //aggiunte icone invece delel scritte
//     footerPlayBtn.style.display = "none";
//   } else {
//     currentAudio.pause();
//     footerPlayBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
//   }
// });
