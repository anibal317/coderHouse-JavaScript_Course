// const axios = require('axios').default;
const divBooks = document.getElementById('books')
const pPhrase = document.getElementById('phrase')
const icon = document.getElementById('icon')
const btnOtra = document.getElementById('otra')

axios.get('https://google-books.p.rapidapi.com/volumes', {
        headers: {
            'x-rapidapi-host': 'google-books.p.rapidapi.com',
            'x-rapidapi-key': 'e6f508925bmshc1a019dc65b5062p164441jsn38a4dcc9ae79'
        }
    })
    .then(function (response) {
        // handle success
        divBooks.innerHTML = ''
        response.data.items.forEach(element => {
            divBooks.innerHTML += `<div class="card mb-3 imbBookContainer">
                                        <div class="row g-0">
                                            <div class="col-md-4 bo">
                                                <img src="${element.volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start"
                                                    alt="${element.volumeInfo.title}">
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">${element.volumeInfo.title}</h5>
                                                    <p class="card-text">${element.searchInfo.textSnippet}</p>
                                                    <p class="card-text"><small class="text-muted">${element.volumeInfo.authors}</small></p>
                                                    <div class="btnComprar">
                                                        <a class="btn btn-primary" target="_blank" href="${element.volumeInfo.infoLink}">Comprar</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

callPhrase()
btnOtra.addEventListener("click", callPhrase)


function callPhrase() {
    axios.get('https://api.chucknorris.io/jokes/random')
        .then(function (response) {
            icon.src = response.data.icon_url
            pPhrase.innerText = response.data.value
        })
}