const socket = io()

const chatBoton = document.getElementById('chatBoton')
const parrafoMensaje = document.getElementById('parrafoMensaje')
const inputUsuario = document.getElementById('chatBox')
let user

// Swal.fire({
//     title: 'Identidicacion de usuario',
//     text: 'Ingrese nombre de usuario',
//     input: 'text',
//     inputValidator: (valor) => {
//         return !valor && 'Ingrese su nombre de usuario valido'
//     },
//     allowOutsideClick: false
// }).then(resultado => {
//     user = resultado.value
//     console.log(user)
// })

// chatBoton.addEventListener('click', () => {
//     let fechaActual = new Date().toLocaleString()
//     if (inputUsuario.value.trim().length > 0) {
//         socket.emit("mensaje", {
//             fecha: fechaActual,
//             user: user,
//             mensaje: inputUsuario.value        
//         })
//         inputUsuario.value = ""
//     }
// })

socket.on('mensajes', (arrayMensajes) =>{
    parrafoMensaje.innerHTML = ""
    arrayMensajes.array.forEach(mensaje => {
        parrafoMensaje += `<p> ${mensaje.fecha}: el usuario ${mensaje.user} escribio ${mensaje.mensaje} </p>`
    }); 
})