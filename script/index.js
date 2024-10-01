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
      albArray.forEach((element) => {
        console.log(element);
        const song = new Songs(element.title_short, element.preview, element.md5_image, element.duration);
        console.log(song);
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

// getData(genericUrl + "tizianoferro");
// getData(genericUrl + "queen");
getData(genericUrl + "pino");

class Songs {
  constructor(_title_short, _preview, _md5_image, _duration) {
    this.title_short = _title_short;
    this.preview = _preview;
    this.md5_image = _md5_image;
    this.duration = _duration;
  }
}
