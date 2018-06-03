let apiKey = config.API_KEY;

class Band {
    constructor(name, location, status, formed, years, genre, lyrical, photo, logo){
        this.name = name;
        this.location = location;
        this.status = status;
        this.formed = formed;
        this.years = years;
        this.genre = genre;
        this.lyrical = lyrical
        this.photoURL = photo;
        this.logoURL = logo;
    }
}

function fetchBand(){
    return new Promise((resolve, reject) => {
        fetch(`http://em.wemakesites.net/band/random?api_key=${apiKey}`)
            .then(response => {
                response.json().then(responseData => {
                    console.log(responseData.data.band_name);
                    if(responseData.data.photo === undefined){
                        responseData.data.photo = 'http://www.searshometownstores.com/c.3721178/hometown/img/no_image_available.jpeg?hei=50&wid=100&sharpen=1'
                    }
                    if(responseData.data.logo === undefined){
                        responseData.data.logo = 'http://www.searshometownstores.com/c.3721178/hometown/img/no_image_available.jpeg?hei=50&wid=100&sharpen=1'
                    }

                    if(responseData.data.band_name == undefined) {
                        return 0;
                    }

                    let band = new Band(
                        responseData.data.band_name,
                        responseData.data.details.location,
                        responseData.data.details.status,
                        responseData.data.details["formed in"],
                        responseData.data.details["years active"],
                        responseData.data.details.genre,
                        responseData.data.details["lyrical themes"],
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
}

let buttonAlbum = document.querySelector('.get-album');
buttonAlbum.addEventListener('click', () => {
    let loader = document.querySelector('.loader')
    let albumPlace = document.querySelector('.album');

    loader.style.display = 'block';

    let promiseBand1 = fetchBand();
    let promiseBand2 = fetchBand();
    let promiseBand3 = fetchBand();
    Promise.all([promiseBand1, promiseBand2, promiseBand3]).then(bands => {
        loader.style.display = 'none';
        albumPlace.innerHTML += `<div class="columns">
        <div class="column">
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                        <img src="${bands[0].logoURL}" alt="bands logo">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src="${bands[0].photoURL}" alt="bands photo">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-2">${bands[0].name}</p>
                        </div>
                    </div>
    
                    <div class="">
                        <p id="location">Band Location: ${bands[0].location}</p>
                        <p>Status: ${bands[0].status}</p>
                        <p>Formed In: ${bands[0].formed}</p>
                        <p>Years Active: ${bands[0].years}</p>
                        <p>Genre: ${bands[0].genre}</p>
                        <p>Lyrical Themes: ${bands[0].lyrical}</p>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                        <img src="${bands[1].logoURL}" alt="bands logo">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src="${bands[1].photoURL}" alt="bands photo">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-2">${bands[1].name}</p>
                        </div>
                    </div>
    
                    <div class="">
                        <p id="location">bands Location: ${bands[1].location}</p>
                        <p>Status: ${bands[1].status}</p>
                        <p>Formed In: ${bands[1].formed}</p>
                        <p>Years Active: ${bands[1].years}</p>
                        <p>Genre: ${bands[1].genre}</p>
                        <p>Lyrical Themes: ${bands[1].lyrical}</p>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                        <img src="${bands[2].logoURL}" alt="bands logo">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src="${bands[2].photoURL}" alt="bands photo">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-2">${bands[2].name}</p>
                        </div>
                    </div>
    
                    <div class="">
                        <p id="location">bands Location: ${bands[2].location}</p>
                        <p>Status: ${bands[2].status}</p>
                        <p>Formed In: ${bands[2].formed}</p>
                        <p>Years Active: ${bands[2].years}</p>
                        <p>Genre: ${bands[2].genre}</p>
                        <p>Lyrical Themes: ${bands[2].lyrical}</p>
                    </div>
    
                </div>
            </div>
        </div>
    </div>`
    });

});