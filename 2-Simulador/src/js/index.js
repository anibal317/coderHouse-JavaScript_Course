// const axios = require('axios').default;
const divBooks = document.getElementById('books');
const phrase = document.getElementById('phrase');
const icon = document.getElementById('icon');
const btnOtra = document.getElementById('otra');
const info = document.getElementById('infoUser');
const btnLogin = document.getElementById('btnLogin');
const lblUser = document.getElementById('user');
const lblDni = document.getElementById('dni');


let user = {};
// user={
//     user:"Jorge"
// }
let myCar = []

btnOtra.addEventListener("click", callPhrase)
btnLogin.addEventListener("click", login)

callPhrase()

let lstProducts = []

async function getDatos() {
    let a = await
    fetch('https://google-books.p.rapidapi.com/volumes', {
        headers: {
            'x-rapidapi-host': 'google-books.p.rapidapi.com',
            'x-rapidapi-key': 'e6f508925bmshc1a019dc65b5062p164441jsn38a4dcc9ae79'
        }
    })
    let finalData = await a.json()

    finalData.items.forEach((element, index) => {
        let item = {
            internalId: index,
            ...element,
            price: getRandomNumbers(100, 200, 2)
        }
        lstProducts.push(item)

    })
    return lstProducts
}

rederCards()

async function rederCards() {
    const lstBooks = await getDatos()
    divBooks.innerHTML = ''
    for (let i = 0; i < lstBooks.length; i++) {
        divBooks.innerHTML += createCard(lstBooks[i])
    }

    let a = document.getElementsByClassName('btnBuy')
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener('click', comprar)
    }
}


function createCard(book) {
    return `<div class="card mb-3 imbBookContainer">
                    <div class="row g-0">
                        <div class="col-md-4 bo">
                            <img src="${book.volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start"
                            alt="${book.volumeInfo.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.volumeInfo.title} </h5>
                                <p class="card-text">${book.searchInfo.textSnippet}</p>
                                <p class="card-text"><small class="text-muted">${book.volumeInfo.authors} - Cod: ${book.internalId}</small></p>
                                <p>Price: ${book.price}</p>
                           </div>
                        </div>
                    </div>
                    <button id="btnBuy" class="btn btn-success btnBuy" data-price=${book.price} data-id=${book.internalId}>Comprar</button>
                </div>`

}

function callPhrase() {
    axios.get('https://api.chucknorris.io/jokes/random')
        .then(function (response) {
            // icon.src = response.data.icon_url
            icon.src = 'https://d1nxzqpcg2bym0.cloudfront.net/google_play/wirelessless.net.chucknorrisfacts4gearfit/26314594-0cb3-11e5-a073-7fbac12c16d2/128x128'
            phrase.innerText = response.data.value
        })
}


function login() {
    let userNickName = prompt("Ingrese Usuario")
    let userDni = prompt("Ingrese DNI")

    if (userNickName != '' && userDni != '' && userNickName != ' ' && userDni != ' ') {
        user = {
            user: userNickName,
            userDni
        }
        info.style.display = 'block'
        btnBuy.style.display = 'inline'
        showUserData(user)
    } else {
        alert("Los datos deben estar completos")
    }
}

async function comprar(e) {
    swal(`Producto: ${e.target.dataset.id}  Precio: ${e.target.dataset.price}`)
    swal({
		"title": "Eliseo@gardner.biz",
		"text": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
	})
}

function productExist(id) {
    if (lstProducts.length >= id) {
        return true
    } else {
        return false
    }
}

function showUserData(obj) {
    lblUser.innerText = obj.user
    lblDni.innerText = obj.userDni
}

function searchProduct() {
    let strfilter = prompt("Ingrese producto")
    let list = lstProducts.filter(element => element.includes(strfilter))
    alert(list.join('\n'))
}

function getRandomNumbers(min, max, dec) {
    return (Math.random() * (max - min) + min).toFixed(dec);
}