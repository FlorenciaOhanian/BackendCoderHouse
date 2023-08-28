import express from 'express'
import productRouter from './routes/productos.routes.js'
import carritoRouter from './routes/cart.routes.js';
import { __dirname } from './path.js'
import { engine } from 'express-handlebars';
import path from 'path';
import {Server} from 'socket.io';

const PORT = 8080
const app = express()

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Middleware
app.use(express.json())
app.use(express.urlencoded ({extended: true}))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Server de socket.io
const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (info) => {
        console.log(info)
    })
    
})

//Ruotes  
app.use('/api/productos', productRouter)
app.use('/api/carts', carritoRouter)

app.get('/api/productos', (req, res) => {
    res.render('home')
})

app.get('/static', (req,res)=>{
    res.render('home')
})

