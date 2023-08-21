import express from 'express'
import productRouter from './routes/productos.routes.js'
import carritoRouter from './routes/cart.routes.js';
import { __dirname } from './path.js'


const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded ({extended: true}))

app.use('/api/productos', productRouter)
app.use('/api/carts', carritoRouter)
// app.use('/static', express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
