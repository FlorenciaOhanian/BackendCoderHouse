import {promises as fs} from 'fs'

class Product {
    constructor(codigo, nombre, marca, precio, img, unidades, categoria) {
        this.codigo = codigo;
        this.id = Product.incrementarId();
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
        this.unidades = unidades;
        this.cantidad = 1;
        this.categoria = categoria;
    }
    static incrementarId() {
        if (this.incrementoId) {
            this.incrementoId++
        } else {
            this.incrementoId = 1
        }
        return this.incrementoId
    }
}

class ProductManager {
    constructor(path) {
                this.path = path;
    }
    addProduct = async (producto) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const checkCod = productos.find(product => product.codigo === producto.codigo);
        if (checkCod) {
            console.log('Codigo ya existe');
        } else {
            productos.push(producto);
            await fs.writeFile(this.path, JSON.stringify(productos))
            console.log("Producto agregado")
        }
    }

    getProductos =  async() => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return(productos)
    }

    getProductById = async (productotId) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const checkId = productos.find(product => product.id === productotId);
        if (checkId) {
            console.log(checkId)
        } else {
            console.log('No existe producto con ese id')
        }
    }
    updateProduct = async (id, producto) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const checkId = productos.findIndex(prod => prod.id === id);
        if (checkId != -1) {
            productos[checkId].codigo = producto.codigo || productos[checkId].codigo
            productos[checkId].nombre = producto.nombre || productos[checkId].nombre
            productos[checkId].marca = producto.marca || productos[checkId].marca
            productos[checkId].precio = producto.precio || productos[checkId].precio
            productos[checkId].img = producto.img || productos[checkId].img
            productos[checkId].unidades = producto.unidades || productos[checkId].unidades
            productos[checkId].cantidad = producto.cantidad || productos[checkId].cantidad
            productos[checkId].categoria = producto.categoria || productos[checkId].categoria

            await fs.writeFile(this.path, JSON.stringify(productos))
        } else {
            console.log('Producto no encontrado')
        }
    }
    deleteProduct = async (id) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)
        if (producto) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)))
        } else {
            console.log("Producto no encontrado")
        }
    }
}


// const prod1 = new Product("123CDE", "Caño de escape", "KGI", 1800, "../img/caño.jpg", "1 unidad", "Motor")
// const prod2 = new Product("456AMG", "Amortiguador", "KGI", 2300, "../img/amortiguador.jpg", "1 unidad", "Frenos")
// const prod3 = new Product("789CBR", "Carburador", "KGI", 3600, "../img/carburador.jpg", "1 unidad", "Motor")
// const prod4 = new Product("124CAP", "Acelerador", "KGI", 3800, "../img/Acelerador.jpg", "1 unidad", "Frenos")
// const prod5 = new Product("582KUJ", "Disco de freno", "KGI", 2000, "../img/discodefreno.jpg", "1 unidad", "Frenos")
// const prod6 = new Product("723JUH", "Pastilla de freno", "KGI", 5000, "../img/Pastilladefreno.jpg", "1 unidad", "Frenos")
// const prod7 = new Product("586IAU", "Asiento", "KGI", 8600, "../img/Asiento.jpg", "1 unidad", "Exterior")
// const prod8 = new Product("657KAER", "Funda", "KGI", 1200, "../img/funda.jpg", "1 unidad", "Exterior")
// const prod9 = new Product("758AND", "Luz", "KGI", 5200, "../img/luz.jpg", "1 unidad", "Exterior")
// const prod10 = new Product("325MSE", "Cilindro", "KGI", 6500, "../img/cilindro.jpg", "1 unidad", "Motor")



const nuevaInstancia = new ProductManager('C:/Users/flore/OneDrive/Escritorio/Backend/src/productos.json')


// console.log(nuevaInstancia.getProductos())

// // console.log(nuevaInstancia.getProductById(2))
// // console.log(nuevaInstancia.updateProduct(1, prueba))
// // console.log(nuevaInstancia.getProductos())
// // console.log(deleteProduct(1))

// console.log(nuevaInstancia.addProduct(prod1))
// console.log(nuevaInstancia.addProduct(prod2))
// console.log(nuevaInstancia.addProduct(prod3))
// console.log(nuevaInstancia.addProduct(prod4))
// console.log(nuevaInstancia.addProduct(prod5))
// console.log(nuevaInstancia.addProduct(prod6))
// console.log(nuevaInstancia.addProduct(prod7))
// console.log(nuevaInstancia.addProduct(prod8))
// console.log(nuevaInstancia.addProduct(prod9))
// console.log(nuevaInstancia.addProduct(prod10))



import express from 'express'

const PORT = 8080
const app = express()

app.get('/', (req, res) => {
    res.send("Bienvenidos a respuestos KGI")
})


//Para que funcione el query con limite es necesario agregar despues de la url ?limit=x  ----> siendo x un valor ingresado por el usuario ejemplo: http://localhost:8080/productos/?limit=3
app.get('/productos/', async (req, res) => {
    const MisProductos = await nuevaInstancia.getProductos()
    const limit = req.query.limit;
    if (limit) {
        const LimitaProductos = MisProductos.slice(0, parseInt(limit));
        res.send(LimitaProductos);
    } else {
        res.send(MisProductos);
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})