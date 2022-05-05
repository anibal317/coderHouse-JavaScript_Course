import path from '../data/path/path.js'

const btnLogin2 = document.getElementById('Entrar');
let logged = false
let userLogged = {};

btnLogin2.removeEventListener('click',log)
btnLogin2.addEventListener('click', log)

function log() {
    console.log("Hi")
    const frmEmail = document.getElementById('floatingInput')
    const frmPwd = document.getElementById('floatingPassword')

    if (!localStorage.getItem('userLogged')) {
        let userLogin = frmEmail.value
        let pwd = frmPwd.value

        fetch('../src/data/json/users.json')
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                datos.forEach(user => {
                    if (user.userName === userLogin && user.password === pwd) {
                        userLogged = {
                            usName: user.lastName + ", " + user.name,
                            usDni: user.dni
                        }
                        logged = true
                        console.log(path.index)
                        window.location.href = "http://127.0.0.1:5500/2-Simulador/"+path.index;
                    }

                })
                if (logged) {
                    localStorage.setItem('userLogged', JSON.stringify(userLogged))
                    sessionStorage.setItem('online', true)
                    showUserData(userLogged, 'Bienvenido')
                } else {
                    swal('Datos Incorrectos')
                }
            })
    }

    // if (userNickName != '' && userDni != '' && userNickName != ' ' && userDni != ' ') {
    //     user = {
    //         user: userNickName,
    //         userDni
    //     }
    //     info.style.display = 'block'
    //     btnBuy.style.display = 'inline'
    //     showUserData(user)
    // } else {
    //     alert("Los datos deben estar completos")
    // }
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