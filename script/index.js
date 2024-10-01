// Funzione per cercare tracce
async function searchTracks(query) {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
    const data = await response.json();
    displaySearchResults(data);
  } catch (error) {
    console.error("Errore nella ricerca:", error);
  }
}

// Funzione per visualizzare i risultati della ricerca
function displaySearchResults(data) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = ""; // Pulisce i risultati precedenti

  data.data.forEach((track) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("track");
    trackElement.innerHTML = `
        <img src="${track.album.cover_small}" alt="${track.title}" />
        <div>
          <h5>${track.title}</h5>
          <p>${track.artist.name}</p>
        </div>
      `;
    trackElement.addEventListener("click", () => loadTrackToPlayer(track));
    searchResultsContainer.appendChild(trackElement);
  });
}

// Funzione per caricare il brano nel player
function loadTrackToPlayer(track) {
  const playerTrackTitle = document.getElementById("player-track-title");
  const playerTrackArtist = document.getElementById("player-track-artist");
  const playerTrackCover = document.getElementById("player-track-cover");

  playerTrackTitle.textContent = track.title;
  playerTrackArtist.textContent = track.artist.name;
  playerTrackCover.src = track.album.cover_medium;
}

// Gestione evento di ricerca
const searchInput = document.querySelector(".searchButton");
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    searchTracks(query);
  }
});

// Sezione per i risultati della ricerca
document.body.innerHTML += '<div id="search-results"></div>';
