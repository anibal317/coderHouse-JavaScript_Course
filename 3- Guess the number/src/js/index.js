//Dom elements
const intents = document.getElementById('intents')
const number = document.getElementById('number')
const assertions = document.getElementById('good')
const mistakes = document.getElementById('wrong')
const inputNumber = document.getElementById('inputNumber')
const btnPlay = document.getElementById('play')
const btnReset = document.getElementById('reset')
const res = document.getElementById('res')

btnPlay.addEventListener('click', play)
btnReset.addEventListener('click', reset)
let array
let base = random();
let i = 0
let bien = 0;
let mal = 0;
let intIntents = 1;
btnReset.disabled = true

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
        res.scrollTop = res.scrollHeight;

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
    console.log("Hola", val, " ", base)
    if (JSON.stringify(val) === JSON.stringify(base)) {
        btnPlay.disabled = true
        btnReset.disabled = false
        alert(`Felicitaciones, el número ${val.join('')} es el ganador!!! en ${intIntents} movimiento/s`)

    } else if (validaciones(val)) {
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
    let sysNumber = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
    let strSysNumber = sysNumber.toString().split('')
    if (validaciones(strSysNumber)) {
        return strSysNumber
    } else {
        random()
    }
}

function reset() {
    bien = 0
    mal = 0
    intIntents = 0
    btnReset.disabled = true
    btnPlay.disabled = true
    number.innerText = `-`;
    assertions.innerText = `-`;
    mistakes.innerText = `-`;
    intents.innerText = `Intentos:`;
    inputNumber.value = ''
}