let lstDatos = document.getElementById('datos')
let myList= sessionStorage.getItem('myOwnCar').split(',')
let lista = sessionStorage.getItem('productList').split(',')

lstDatos.innerText=''
myList.forEach(element => {
  lstDatos.innerText+=lista[element]+"\n"
});