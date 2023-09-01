const form = document.getElementById("idForm")
const agregarProducto = document.getElementById('btn-form')
const containerProductos = document.getElementById('containerProductos')

const socket = io()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    // console.log(prod)
    await socket.emit('nuevoProducto', prod)
    e.target.reset()
})



const eliminarProducto =  e => socket.emit('eliminarProducto', e.target.id);

socket.emit('cargarProductos')

socket.on('mostrarProductos', (productos) => {
    productos.forEach(producto => {
        containerProductos.innerHTML += `
        <div id=${producto.id} class="containerItem">
            <h2>${producto.nombre}</h2>
            <p><b>Codigo:</b> ${producto.codigo}</p>
            <p><b>Marca:</b> ${producto.marca}</p>
            <p><b>Precio: $</b>${producto.precio}</p>
            <p><b>Unidades:</b> ${producto.unidades}</p>
            <p><b>Cantidad:</b> ${producto.cantidad}</p>
            <p><b>Categoria:</b> ${producto.categoria}</p>
            <button id=${producto.id} class='eliminar'> Eliminar </button>
        </div>
        `
        
    });
})
socket.on('mostrarNuevoProducto', (producto) => {
    containerProductos.innerHTML += `
    <div id=${producto.id} class="containerItem">
        <h2>${producto.nombre}</h2>
        <p><b>Codigo:</b> ${producto.codigo}</p>
        <p><b>Marca:</b> ${producto.marca}</p>
        <p><b>Precio: $</b>${producto.precio}</p>
        <p><b>Unidades:</b> ${producto.unidades}</p>
        <p><b>Cantidad:</b> ${producto.cantidad}</p>
        <p><b>Categoria:</b> ${producto.categoria}</p>
        <button id=${producto.id} class='eliminar'> Eliminar </button>
    </div>
    `
})
// agregarProducto.addEventListener('click', () => {
//         socket.on('prods', (prods) => {
//         const containerProductos = document.getElementById('containerProductos')
//         containerProductos.innerHTML= ''
//         prods.forEach(producto => {
//             containerProductos.innerHTML += `
// 			<div class="containerItem">
//                 <h2>${producto.nombre}</h2>
//                 <p><b>Codigo:</b> ${producto.codigo}</p>
//                 <p><b>Marca:</b> ${producto.marca}</p>
//                 <p><b>Precio: $</b>${producto.precio}</p>
//                 <p><b>Unidades:</b> ${producto.unidades}</p>
//                 <p><b>Cantidad:</b> ${producto.cantidad}</p>
//                 <p><b>Categoria:</b> ${producto.categoria}</p>
//                 <button id=${producto.codigo} class='eliminar'> Eliminar </button>

//             </div>
// 		`;
//         })

//     })
// })

document.addEventListener('click', e => e.target.matches('.eliminar') && eliminarProducto(e));
