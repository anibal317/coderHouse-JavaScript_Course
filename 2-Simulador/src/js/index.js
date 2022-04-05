// const axios = require('axios').default;
const divBooks = document.getElementById('books');
const pPhrase = document.getElementById('phrase');
const icon = document.getElementById('icon');
const btnOtra = document.getElementById('otra');
const info = document.getElementById('infoUser');
const btnBuy = document.getElementById('btnComprar');
const btnLogin = document.getElementById('btnLogin');
const btnMyCar = document.getElementById('btnMyCar');
const btnSearchCodProduct = document.getElementById('btnSearchCodProduct');
const lblUser = document.getElementById('user');
const lblDni = document.getElementById('dni');

let user = {};
// user={
//     user:"Jorge"
// }
let lstProducts = [];
let myCar = []

btnBuy.addEventListener('click', comprar);
btnOtra.addEventListener("click", callPhrase)
btnLogin.addEventListener("click", login)
btnSearchCodProduct.addEventListener("click", searchProduct)

callPhrase()
verifySession()


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
    btnMyCar.style.display = 'none'

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
        info.style.display = 'inline'
        btnBuy.style.display = 'inline'
        btnMyCar.style.display = 'inline'
        showUserData(user)
    } else {
        alert("Los datos deben estar completos")
    }
}

async function comprar() {
    //objeto
    // localStorage.setItem("productos", JSON.stringify(miObjeto))

    let producto = prompt(`Productos\n${lstProducts.join('\n')}`)

    if (productExist(parseInt(producto))) {
        myCar.push(parseInt(producto))
        sessionStorage.setItem("myOwnCar", myCar)
        productExist(parseInt(producto))
        console.log(sessionStorage.getItem("myOwnCar"))
    } else {
        alert('Cod de producto ingresado incorrecto')
    }

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

console.log(lstProducts)

function searchProduct() {
    let strfilter = prompt("Ingrese producto")
    let list = lstProducts.filter(element =>  element.includes(strfilter))
    alert(list.join('\n'))
}