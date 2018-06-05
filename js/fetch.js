let apiKey = config.API_KEY;

class Band {
    constructor(id,name, location, status = 'N/A', formed = 'N/A', years = 'N/A', genre, lyrical = 'N/A' , photo = 'N/A', logo = 'N/A'){
        this.id = id
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

function fetchRandomBand(){
    return new Promise((resolve, reject) => {
        fetch(`https://em.wemakesites.net/band/random?api_key=${apiKey}`)
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
                        responseData.data.id,
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

function formBands(bands) {
    let albumPlace = document.querySelector('.album');
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
                        <p class="title is-2">
                            <a href="https://www.metal-archives.com/band/view/id/${bands[0].id}" target="_blank" rel="noopener noreferrer">${bands[0].name}</a>
                        </p>
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
                        <p class="title is-2">
                            <a href="https://www.metal-archives.com/band/view/id/${bands[1].id}" target="_blank" rel="noopener noreferrer">${bands[1].name}</a>
                        </p>
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
                        <p class="title is-2">
                            <a href="https://www.metal-archives.com/band/view/id/${bands[2].id}" target="_blank" rel="noopener noreferrer">${bands[2].name}</a>
                        </p>
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
}

let buttonAlbum = document.querySelector('.get-random-band');
if(buttonAlbum !== null){
    buttonAlbum.addEventListener('click', () => {
        let loader = document.querySelector('.loading')
        loader.style.display = 'block';
    
        let promiseBand1 = fetchRandomBand();
        let promiseBand2 = fetchRandomBand();
        let promiseBand3 = fetchRandomBand();
    
        Promise.all([promiseBand1, promiseBand2, promiseBand3]).then(bands => {
            formBands(bands);
            loader.style.display = 'none';
        });
    
    });
}

function fetchBandByCountry(countryCode){
    return new Promise((resolve, reject) => {
        fetch(`http://em.wemakesites.net/country/${countryCode}?api_key=${apiKey}`)
            .then(response => {
                response.json().then(responseData => {
                    let bands = [];
                    console.log(responseData.data.search_results);
                    for(let i=0; i<responseData.data.search_results.length; i++){
                        if(responseData.data.search_results[i] !== undefined){
                            bands[i] = new Band(
                                responseData.data.search_results[i].id,
                                responseData.data.search_results[i].name,
                                responseData.data.search_results[i].location,
                                'N/A',
                                'N/A',
                                'N/A',
                                responseData.data.search_results[i].genres[0]  
                            )
                        }
                    }
                    resolve(bands);
                });
            })
            .catch(error => {
                console.log(error);
            });  
    });
}

function formBandsCountry(bands){
    let albumPlace = document.querySelector('.album');
    for(let i=0; i<(bands.length-2); i+=3){
        albumPlace.innerHTML += `<div class="columns">
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-2">
                                <a href="https://www.metal-archives.com/band/view/id/${bands[i].id}" target="_blank" rel="noopener noreferrer">${bands[i].name}</a>
                            </p>
                        </div>
                    </div>
                    <div class="">
                        <p id="location">Band Location: ${bands[i].location}</p>
                        <p>Genre: ${bands[i].genre}</p>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-2">
                                <a href="https://www.metal-archives.com/band/view/id/${bands[i+1].id}" target="_blank" rel="noopener noreferrer">${bands[i+1].name}</a>
                            </p>
                        </div>
                    </div>
                    <div class="">
                        <p id="location">Band Location: ${bands[i+1].location}</p>
                        <p>Genre: ${bands[i+1].genre}</p>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-2">
                                <a href="https://www.metal-archives.com/band/view/id/${bands[i+2].id}" target="_blank" rel="noopener noreferrer">${bands[i+2].name}</a>
                            </p>
                        </div>
                    </div>
                    <div class="">
                        <p id="location">Band Location: ${bands[i+2].location}</p>
                        <p>Genre: ${bands[i+2].genre}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    console.log('hey');
}

let selectCountry = document.querySelector('.select-country');
let getBandCountry = document.querySelector('.get-band-country');
if(getBandCountry !== null) {
    getBandCountry.addEventListener('click', () => {
        let loader = document.querySelector('.loading')
        loader.style.display = 'block';
    
        let countryCode = selectCountry.value;
        fetchBandByCountry(countryCode).then((bands)=> {
            formBandsCountry(bands);
            loader.style.display = 'none';
        })
    });
}

