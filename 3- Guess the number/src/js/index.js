//Dom elements
const intents = document.getElementById('intents')
const number = document.getElementById('number')
const assertions = document.getElementById('good')
const mistakes = document.getElementById('wrong')
const inputNumber = document.getElementById('inputNumber')
const btnPlay = document.getElementById('play')

btnPlay.addEventListener('click', play)
let array
let base = random();
let i = 0
let bien = 0;
let mal = 0;
let intIntents = 1;

console.log(base);

function play() {
    console.log(`"A jugar con el número: ${inputNumber.value}`)
    array = inputNumber.value.split('')

    if (validaciones(array)) {
        if (number.innerText == '-') {
            number.innerText = ''
            assertions.innerText = ''
            mistakes.innerText = ''
        }
        compare(array);
        number.innerText += `${parseInt(array.join(''))}\n`;
        assertions.innerText += `${bien}\n`;
        mistakes.innerText += `${mal}\n`;
        intents.innerText = `Intentos: ${intIntents}`;
        bien = 0;
        mal = 0;

    } else {
        alert("El número ingreso no es valido")
    }

}

function validaciones(arr) {
    let res = false
    if (arr[0] != "0" && arr.length == 4 && arr.every(esPrimero)) {
        res = true
    }
    return res
}

function compare(val) {
    console.log("Hola", val, " ",base)
    if (JSON.stringify(val) === JSON.stringify(base)) {
        btnPlay.disabled=true
        alert(`Felicitaciones, el número ${val.join('')} es el ganador!!! en ${intIntents}`)

    }else if (validaciones(val)){
        base.forEach((element, index) => {
            if (element === array[index]) {
                bien++
            } else if (array.includes(element)) {
                mal++
            }
        })
        intIntents++
    } else {
        return "No paso las validaciones"
    };
}


function esPrimero(valor, indice, lista) {
    return (lista.indexOf(valor) === indice);
}

function random() {
    let min = 1023
    let max = 9876
    let sysNumber = Math.floor((Math.random() * (max - min + 1)) + min);
    let strSysNumber = sysNumber.toString().split('')
    if (validaciones(strSysNumber)) {
        return strSysNumber
    } else {
        random()
    }
}