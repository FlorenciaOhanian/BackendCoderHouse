const form = document.getElementById("idForm")
const mostrarProductos = document.getElementById('btn-form')
const socket = io()

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    await socket.emit('nuevoProducto', prod)
    // await socket.emit('update-products')
    e.target.reset()
})
const eliminarProducto =  e => socket.emit('eliminarProducto', e.target.id);

mostrarProductos.addEventListener('click', () => {
 
    socket.on('prods', (prods) => {
        const containerProductos = document.getElementById('containerProductos')
        containerProductos.innerHTML= ''
        // console.log('PRODUCTOS: ', prods)

        prods.map(producto => {
            containerProductos.innerHTML += `
          
			<div>
                <h2>${producto.nombre}</h2>
                <p><b>Codigo:</b> ${producto.codigo}</p>
                <p><b>Marca:</b> ${producto.marca}</p>
                <p><b>Precio: $</b>${producto.precio}</p>
                <p><b>Unidades:</b> ${producto.unidades}</p>
                <p><b>Cantidad:</b> ${producto.cantidad}</p>
                <p><b>Categoria:</b> ${producto.categoria}</p>
                <button id=${producto.codigo} class='eliminar'> Eliminar </button>

            </div>
		`;
        })

    })
})



document.addEventListener('click', e => e.target.matches('.eliminar') && eliminarProducto(e));
