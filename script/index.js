const genericUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const getData = (url) => {
  fetch(url)
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
      const albArray = albums.data;
      const element = albArray[Math.floor(Math.random() * 25)];
      const song = new Songs(element.artist.name, element.title_short, element.preview, element.album.cover, element.duration);
      console.log(song);

      const popularRow = document.getElementById("popularRow");
      const colRadio = document.createElement("div");
      colRadio.classList.add("col");

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
      colAlbum.classList.add("col");

      colAlbum.innerHTML = `
    <div class="card h-100 border-0 text-white testH position-relative">
                    <div class="rounded p-2 m-0 badgePlay">
                        <img src="${song2.cover}" class="img-fluid rounded" alt="..." />
                        <a class="play-song-btn" href="#">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="#63D566"
                            class="bi bi-play-circle-fill position-absolute mb-2"
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
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const artisti = ["tizianoferro", "queen", "pino", "lazza", "weeknd", "travis", "Eminem", "Annalisa", "Billie", "post", "fedez", "lady", "adele"];

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
