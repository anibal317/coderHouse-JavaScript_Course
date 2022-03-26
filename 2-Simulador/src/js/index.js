// const axios = require('axios').default;
const divBooks = document.getElementById('books')
const pPhrase = document.getElementById('phrase')
const icon = document.getElementById('icon')
const btnOtra = document.getElementById('otra')

axios.get('https://google-books.p.rapidapi.com/volumes', {
        headers: {
            'x-rapidapi-host': 'google-books.p.rapidapi.com',
            'x-rapidapi-key': '948b6dd5b9mshb4da007de990f34p1551e4jsn6ef3514cf41e'
        }
    })
    .then(function (response) {
        // handle success
        divBooks.innerHTML = ''
        response.data.items.forEach(element => {
            divBooks.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src="${element.volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start"
                                                    alt="${element.volumeInfo.title}">
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">${element.volumeInfo.title}</h5>
                                                    <p class="card-text">${element.searchInfo.textSnippet}</p>
                                                    <p class="card-text"><small class="text-muted">${element.volumeInfo.authors}</small></p>
                                                    <a class="btn btn-primary" target="_blank" href="${element.volumeInfo.infoLink}">Ver mas</a>
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