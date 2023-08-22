import express from 'express'
import productRouter from './routes/productos.routes.js'
import carritoRouter from './routes/cart.routes.js';
import { __dirname } from './path.js'
import { engine } from 'express-handlebars';
import path from 'path';

const PORT = 8080
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded ({extended: true}))
// app.use('/static', express.static(path.join(__dirname, '/public')))
// app.engine('handlebars', engine())
// app.set('view engine', 'handlebars')
// app.set('views', path.resolve(__dirname, './views'))

//Ruotes
app.use('/api/productos', productRouter)
app.use('/api/carts', carritoRouter)
// app.get('/api/productos', (req, res) => {
//     res.render('home')
// })



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
