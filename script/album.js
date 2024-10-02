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
// button
const playBtnC = document.querySelector(".playBtnC");
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

// Url barra
const idBar = new URLSearchParams(location.search);
const albumId = idBar.get("albumId");

console.log(albumId);

// get album
const Url = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

console.log(Url);

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
    .then((album) => {
      console.log("album disponibili", album);
      albumCover.src = album.cover_medium;
      albumTitle.innerText = album.title;
      albumInfo.innerHTML = `${album.artist.name} • ${album.release_date.substring(0, 4)} • ${album.nb_tracks} brani, ${(album.duration / 60).toFixed(0)} min`;

      console.log(album.tracks);
      const albumArray = album.tracks.data;
      albumArray.forEach((singleTrack, i) => {
        // console.log(singleTrack);
        const tr = document.createElement("tr");
        tr.classList.add("hoverTr");
        tr.innerHTML = `
                  <th class="d-flex align-items-center gap-1" scope="row">${i + 1} <img src="../assets/imgs/sound Sp.gif" height="18"  class="d-none"/> </th>
                  <td class="hoverTr">${singleTrack.title}</td>
                  <td>${singleTrack.rank.toString().slice(0, 3)}.${singleTrack.rank.toString().slice(3, 7)}</td>
                  <td>${(singleTrack.duration / 60).toFixed(2)}</td>`;

        trackList.appendChild(tr);

        const playSong = tr.querySelector(".hoverTr");
        playSong.addEventListener("click", () => {
          currentAudio.src = albumArray[i].preview;
          currentAudio.play();

          const imgAll = table.querySelectorAll("img");
          console.log(imgAll);

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
  console.log(currentAudio.volume);
});

progress.addEventListener("input", () => {
  currentAudio.currentTime = progress.value;
  console.log(currentAudio.currentTime);
});

getData();
