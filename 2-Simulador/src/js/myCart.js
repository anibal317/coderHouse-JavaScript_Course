const cartElements = document.getElementById('cartElemets')
const strTotal = document.getElementById('total')
const btnEndBuy = document.getElementById('end')
const cart = JSON.parse(localStorage.getItem('myCart'))
verifyCart(cart)
function createCard(a) {
  return `<div class="card mb-3 finalCart">
                  <p class="card-text">Producto: ${a.title}</p>
                  <p class="card-text">Precio por producto: ${a.precio}</p>
                  <p class="card-text">Cantidad: ${a.cantidad} </p>
                  <p class="card-text">Precio total: ${a.totalAmount} </p>
         </div>`
}

btnEndBuy.addEventListener('click', endBuy)
strTotal.innerHTML = `Total: ${cartTotalPrice(cart)}`

rederCards()
async function rederCards() {
  cartElements.innerHTML = ''
  for (let i = 0; i < cart.length; i++) {
    cartElements.innerHTML += createCard(cart[i])
  }
}

function cartTotalPrice(cart) {
  let total = 0
  cart.forEach(el => {
    total += el.totalAmount
  })
  return total
}

function endBuy() {
  swal({
    title: 'Finalización de la compra',
    text: "Total a pagar: $" + cartTotalPrice(cart).toString() + '\n\nGracias por su compra'
  })
  deleteCart(cart)
  window.location.reload()
}

function deleteCart(el) {
  localStorage.removeItem('myCart')
}

function verifyCart(el) {
  if (!el) {
    btnEndBuy.style.display = 'none'
  }
}