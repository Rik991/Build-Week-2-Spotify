const genericUrl = " https://striveschool-api.herokuapp.com/api/deezer/search?q=tizianoferro";

const getData = () => {
  fetch(genericUrl)
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
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
getData();
