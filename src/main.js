import express from 'express'
import productRouter from './routes/productos.routes.js'
import { __dirname } from './path.js'
import path from 'path';

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded ({extended: true}))

app.use('/api', productRouter)
// app.use('/static', express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
