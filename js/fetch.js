let getAlbum = documento.querySelector('.get-album');
let apiKey = config.API_KEY;

fetch('https://myexample.com', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: 'foo=bar&blah=1'
})