let taskOne = document.getElementById('taskOne');
let number = document.getElementById('inputNumber');
let btnCalcular = document.getElementById('calcular')
let lblResult = document.getElementById('lblResult');
let doWhile= document.getElementById('doWhile');
let lblPar= document.getElementById('pares');


//Ejercicio 1
for (let i = 1; i <= 10; i++) {
    if(i%2==0){
        lblPar.innerText += "index "+i+" es par\n";
    }
    taskOne.innerText += "2 x " + i + "= " + 2 * i + "\n";
}


//Ejercicio 2
let j=1;
btnCalcular.addEventListener("click", function () {
    while (j <= parseInt(number.value) ) {
        lblResult.innerText+= j +" -> Hellow World!\n";
        j++;
    };
});

//Ejercicio 3
let z=0
do {
    z++;
    doWhile.innerText+="Repeat me\n";
  } while (z < 5);