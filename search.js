const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("song-results");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value;
  if (query) {
    searchSongs(query);
  }
});

const searchSongs = (query) => {
  const searchUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

  fetch(searchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((data) => {
      console.log("Risultati ottenuti:", data);
      displaySearchResults(data.data);
    })
    .catch((error) => {
      console.error("Errore nella ricerca:", error);
    });
};

// Funzione per visualizzare i risultati della ricerca
const displaySearchResults = (songs) => {
  resultsContainer.innerHTML = "";

  songs.forEach((song) => {
    const songItem = document.createElement("div");
    songItem.classList.add("col-md-3");

    songItem.innerHTML = `
      <div class="card h-100 border-0 text-white bg-dark position-relative">
        <div class="rounded p-2 m-0 badgePlay">
          <img src="${song.album.cover_medium}" class="img-fluid rounded" alt="${song.title}" />
          <a class="play-song-btn" href="#" data-preview="${song.preview}" data-title="${song.title}" data-artist="${song.artist.name}" data-cover="${song.album.cover_medium}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#63D566" class="bi bi-play-circle-fill position-absolute" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
            </svg>
          </a>
        </div>
        <div class="card-body pt-0">
          <h6>${song.title}</h6>
          <p class="text-secondary mb-0">${song.artist.name}</p>
        </div>
      </div>
    `;

    resultsContainer.appendChild(songItem);

    const playSongBtn = songItem.querySelector(".play-song-btn");
    playSongBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const previewUrl = playSongBtn.getAttribute("data-preview");
      const songTitle = playSongBtn.getAttribute("data-title");
      const songArtist = playSongBtn.getAttribute("data-artist");
      const songCover = playSongBtn.getAttribute("data-cover");

      playSong(previewUrl, songTitle, songArtist, songCover);
    });
  });
};

const playSong = (previewUrl, title, artist, cover) => {
  const audio = document.getElementById("current-audio");
  const nameSong = document.getElementById("name-song");
  const artistSong = document.getElementById("artist-song");
  const footerImg = document.getElementById("footer-img");

  nameSong.innerText = title;
  artistSong.innerText = artist;
  footerImg.src = cover;

  audio.src = previewUrl;
  audio.play();
};
