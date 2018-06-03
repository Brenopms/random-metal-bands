let getAlbum = document.querySelector('.get-album');
let apiKey = config.API_KEY;
let teste;
let display;

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
            console.log(band)
        });
    })
    .catch(error => {
        console.log(error);
    })   


    //`http://em.wemakesites.net/band/random?api_key=${apiKey}`