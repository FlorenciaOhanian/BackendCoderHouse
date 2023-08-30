const form = document.getElementById("idForm")
const mostrarProductos = document.getElementById('btnMostrarProd')
const socket = io()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})

mostrarProductos.addEventListener('click', () => {
    socket.on('prods', (prods) => {
        console.log('PRODUCTOS: ', prods)
    })
})