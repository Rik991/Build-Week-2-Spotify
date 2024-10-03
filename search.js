const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchForm3 = document.getElementById("search-form3");
const searchInput2 = document.getElementById("search-input2");
const resultsContainer = document.getElementById("song-results");
let searchButton = document.querySelector(".searchButton");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value;
  if (query) {
    searchSongs(query);
  }
});

//searchbar mobile
searchForm3.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput2.value;
  if (query) {
    searchSongs(query);
  }
});

// document.getElementById("searchIcon").addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("cerco");
//   const query = searchInput.value;
//   if (query) {
//     searchSongs(query);
//   }
// });

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
    songItem.classList.add("col-6");
    songItem.classList.add("col-md-3");
    songItem.classList.add("col-lg-2");

    songItem.innerHTML = `
    <a href="album.html?albumId=${song.album.id}">
      <div class="card h-100 border-0 text-white testH" style="max-width: max-content">
        <div class="rounded p-2 m-0 badgePlay position-relative">
          <img src="${song.album.cover_medium}" class="img-fluid rounded" alt="${song.title}" />
          <a class="play-song-btn" href="#" data-preview="${song.preview}" data-title="${song.title}" data-artist="${song.artist.name}" data-cover="${song.album.cover_medium}">
           <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="#63D566"
                            class="bi bi-play-circle-fill position-absolute translate-middle-y bottom-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                          </svg>
          </a>
        </div>
        <div class="card-body pt-0">
          <h6>${song.title}</h6>
          <p class="text-secondary mb-0">${song.artist.name}</p>
        </div>
      </div>
    </a>
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
