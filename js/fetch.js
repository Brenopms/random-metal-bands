let buttonAlbum = document.querySelector('.get-album');
let apiKey = config.API_KEY;

class Band {
    constructor(name, location, status, formed, years, genre, photo, logo){
        this.name = name;
        this.location = location;
        this.status = status;
        this.formed = formed;
        this.years = years;
        this.genre = genre;
        this.photoURL = photo;
        this.logoURL = logo;
    }
}

let getAlbum = new Promise((resolve, reject) => {
    fetch(`http://em.wemakesites.net/band/random?api_key=${apiKey}`)
        .then(response => {
            response.json().then(responseData => {
                console.log(responseData.data.band_name);
                let band = new Band(
                    responseData.data.band_name,
                    responseData.data.details.location,
                    responseData.data.details.status,
                    responseData.data.details["formed in"],
                    responseData.data.details["years active"],
                    responseData.data.details.genre,
                    responseData.data.photo,
                    responseData.data.logo
                );

                resolve(band);
            });
        })
        .catch(error => {
            console.log(error);
        });  
});

buttonAlbum.addEventListener('click', () => {
    let albumPlace = document.querySelector('.album');
    getAlbum.then((band) => {
        let displayBand = `<h2 class="band-name">${band.name}</h2>
        <p id="location">Band Location: ${band.location}</p>
        <p>Status: ${band.status}</p>
        <p>Formed In: ${band.formed}</p>
        <p>Years Active: ${band.years}</p>
        <p>Genre: ${band.genre}</p>
        <img class="image" src="${band.logoURL}" alt="Band logo">
        <img class="image" src="${band.photoURL}" alt="Band photo">`

        albumPlace.innerHTML = displayBand;
    });
});