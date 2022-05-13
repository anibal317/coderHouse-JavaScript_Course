import path from '../data/path/path.js'

const divBooks = document.getElementById('books');
const phrase = document.getElementById('phrase');
const icon = document.getElementById('icon');
const btnOtra = document.getElementById('otra');
const info = document.getElementById('infoUser');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const lblUser = document.getElementById('user');
const lblDni = document.getElementById('dni');
const dataContainter = document.getElementById('btnComprar');
const card = document.getElementsByClassName('card')
const btnBuy = document.getElementsByClassName('btnBuy');

let logged = false

let myCart = JSON.parse(localStorage.getItem('myCart')) || []
let lstProducts = []

btnOtra.addEventListener("click", callPhrase)
btnLogin.addEventListener("click", redirect)
btnLogout.addEventListener("click", logout)

callPhrase()
checkSession()

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
                    <button id="btnBuy" class="btn btn-success btnBuy" data-price=${book.price} data-id=${book.internalId} data-title=${book.volumeInfo.title}>Comprar</button>
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

function redirect() {
    window.location.href = 'sections/' + path.loginPath;
}

function checkSession() {
    if (localStorage.getItem('userLogged') && !!sessionStorage.getItem('online')) {
        showUserData(JSON.parse(localStorage.getItem('userLogged')))
        // btnLogin.style.display = 'none'
        // info.style.display = 'block'
        dataContainter.style.height = "140px"

    } else if (localStorage.getItem('userLogged')) {
        console.log('algo aca?')
        showUserData(JSON.parse(localStorage.getItem('userLogged')), "Bienvenido de nuevo")
        sessionStorage.setItem('online', true)

    } else {
        btnLogin.style.display = 'inline'
        btnLogout.style.display = 'none'
        info.style.display = 'none'
    }
}

function logout() {
    logged = false
    sessionStorage.removeItem('online')
    localStorage.removeItem('userLogged')
    swal('Gracias por visitarnos')
    sleep(7000).then(() => {
        location.reload()
    })
}

async function comprar(e) {
    if (localStorage.getItem('userLogged')) {
        console.log("a buscar", e.target.dataset.id)
        if (productExist(e.target.dataset.id)) {
            calcTotalAmount(productExist(e.target.dataset.id))
            console.log(myCart)

            swal({
                title: "Compra",
                text: `Producto: ${e.target.dataset.id}  Precio: ${e.target.dataset.price}`,
                icon: "success",
            })
            // myCar.push({
            //     'producto': e.target.dataset.id,
            //     'precio': e.target.dataset.price
            // })
            // console.log(myCart)
            // console.log(searchProduct(0))
            // swal({
            //     "title": "Eliseo@gardner.biz",
            //     "text": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
            // })
            saveCart(myCart)
        } else {
            swal({
                title: "Compra",
                text: `Producto: ${e.target.dataset.id}  Precio: ${e.target.dataset.price}`,
                icon: "success",
            })
            myCart.push({
                title:e.target.dataset.title,
                producto: parseInt(e.target.dataset.id),
                precio: parseFloat(e.target.dataset.price),
                cantidad: 1,
                totalAmount: parseFloat(e.target.dataset.price)
            })
            console.log(myCart)
            saveCart(myCart)
        }
    } else {
        swal({
            title: "Error",
            text: "Debe iniciar sesión para realizar un compra",
            icon: "warning"
        })
    }
}

function showUserData(obj, msg) {
    lblUser.innerText = obj.usName
    lblDni.innerText = obj.usDni
    if (msg) {
        swal(msg)
    }
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'inline'
    info.style.display = 'block'
}

function productExist(strProductFound) {
    let strfilter = strProductFound
    return myCart.find(element => element.producto == strfilter)
}

function getRandomNumbers(min, max, dec) {
    return (Math.random() * (max - min) + min).toFixed(dec);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function calcTotalAmount(pro) {
    pro.cantidad++
    pro.totalAmount = pro.precio * pro.cantidad

}

function saveCart(el) {
    localStorage.setItem('myCart', JSON.stringify(el))
}


