import {
    promises as fs
} from 'fs'
// import productModel from '../models/producto-models.js';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getId = async () => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const maxId = productos.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    addProduct = async (codigo, nombre, marca, precio, img, unidades, categoria) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        const checkCod = productos.find(product => product.codigo === codigo);
        if (checkCod) {
            console.log('Codigo ya existe');
            return (false)
        } else {
            let nuevoProducto = {
                codigo,
                nombre,
                marca,
                precio,
                img,
                unidades,
                categoria
            };
            console.log('NUEVO PRODUCTO: ', nuevoProducto)
            nuevoProducto.id = await this.getId()
            productos.push(nuevoProducto);
            await fs.writeFile(this.path, JSON.stringify(productos))
            // console.log("Producto agregado", productos)
        }
    }

    getProductos = async () => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return (productos)
    }

    getProductById = async (productotId) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const productId = productos.filter(product => product.id === productotId);
        if (productId) {
            return (productId)
        } else {
            return ('No existe producto con ese id')
        }
    }

    getProductByCode = async (productoCode) => {
        const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const productCode = productos.filter(product => product.codigo === productoCode);
        if (productCode.length == 0) {
            return (false)
        } else {
            return (true)
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


const nuevaInstancia = new ProductManager('./src/data/productos.json')


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

export default nuevaInstancia