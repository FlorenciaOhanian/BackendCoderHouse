import express from 'express'
import productRouter from './routes/productos.routes.js'
import carritoRouter from './routes/cart.routes.js';
import {
    __dirname
} from './path.js'
import {
    engine
} from 'express-handlebars';
import path from 'path';
import {
    Server
} from 'socket.io';
import { ProductManager } from './services/product-manager.js';

const PORT = 8080
const app = express()

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const productManager = new ProductManager(path.join(__dirname, '/data/productos.json'))
//Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Server de socket.io
const io = new Server(serverExpress)
// const mensajes = []
let prods = []

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    // socket.on('mensajeConexion', (user) => {
    //     if (user.rol === "Admin") {
    //         socket.emit('credecialesConexion', "Usuario valido")
    //     } else {
    //         socket.emit('credecialesConexion', "Usuario invalido")
    //     }
    // })

    // socket.on('mensaje', (infoMensaje) => {
    //     console.log(infoMensaje)
    //     mensajes.push(infoMensaje)
    //     socket.emit('mensajes', mensajes)
    // })

    socket.on('nuevoProducto', async (nuevoProducto) =>{
        const {codigo, nombre, marca, precio, unidades, categoria, cantidad} = nuevoProducto
        const nuevoProd = await productManager.addProduct(codigo, nombre, marca, precio, unidades, categoria, cantidad)
        socket.emit('mostrarNuevoProducto', nuevoProd)
    })

    socket.on('cargarProductos', async () => {
        const productos = await productManager.getProductos()
        socket.emit('mostrarProductos', productos)
    })
    socket.on('eliminarProducto', (eliminarProd) => {
        const nuevosProds = prods.filter(e => e.codigo != eliminarProd)
        prods = nuevosProds
        socket.emit('prods', nuevosProds)
    })

})

//Ruotes  
app.use('/api/productos', productRouter)
app.use('/api/carts', carritoRouter)
app.get('/api/productos', (req, res) => {
    res.render('home')
})

// app.get('/static', (req, res) => {
//     res.render('chat', {
//         css: "style.css",
//         title: "Chat",
        
//     })
// })

app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Form",
        js: "realTimeProducts.js"
    })
})