// const axios = require('axios').default;
const divBooks = document.getElementById('books');
const pPhrase = document.getElementById('phrase');
const icon = document.getElementById('icon');
const btnOtra = document.getElementById('otra');
const info = document.getElementById('infoUser');
const btnBuy = document.getElementById('btnComprar');
const btnLogin = document.getElementById('btnLogin');
const lblUser = document.getElementById('user');
const lblDni = document.getElementById('dni');

let user = {};
// user={
//     user:"Jorge"
// }
let lstProducts = [];

btnBuy.addEventListener('click', comprar);
btnOtra.addEventListener("click", callPhrase)
btnLogin.addEventListener("click", login)




axios.get('https://google-books.p.rapidapi.com/volumes', {
        headers: {
            'x-rapidapi-host': 'google-books.p.rapidapi.com',
            'x-rapidapi-key': 'e6f508925bmshc1a019dc65b5062p164441jsn38a4dcc9ae79'
        }
    })
    .then(function (response) {
        // handle successse.data.items[0])
        divBooks.innerHTML = ''
        response.data.items.forEach((element, index) => {
            divBooks.innerHTML += `<div class="card mb-3 imbBookContainer">
                                        <div class="row g-0">
                                            <div class="col-md-4 bo">
                                                <img src="${element.volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start"
                                                    alt="${element.volumeInfo.title}">
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">${element.volumeInfo.title} </h5>
                                                    <p class="card-text">${element.searchInfo.textSnippet}</p>
                                                    <p class="card-text"><small class="text-muted">${element.volumeInfo.authors} - Cod: ${index}</small></p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
            lstProducts.push(`${index} - ${element.volumeInfo.title}`)
        });
        lstProducts

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })


function callPhrase() {
    axios.get('https://api.chucknorris.io/jokes/random')
        .then(function (response) {
            icon.src = response.data.icon_url
            pPhrase.innerText = response.data.value
        })
}

function verifySession() {
    info.style.display = 'none'
    btnBuy.style.display = 'none'
    console.log(Object.keys(user))
    if (Object.keys(user).length == 0) {
        alert("Debe iniciar sesión para realizar compras")
    }
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

async function comprar() {

    let producto = prompt(`Productos\n${lstProducts.join('\n')}`)
    if (parseInt(producto)) {
        console.log(producto, lstProducts[parseInt(producto)])
    }else{
        alert('Código de producto no válido')
    }

}

function showUserData(obj) {
    lblUser.innerText = obj.user
    lblDni.innerText = obj.userDni

}
callPhrase()
verifySession()