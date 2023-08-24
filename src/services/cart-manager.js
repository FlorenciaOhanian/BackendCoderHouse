import {
    promises as fs
} from 'fs'
import nuevaInstancia from './product-manager.js';

class cartManager {
    constructor(path) {
        this.path = path;
    }

    createCart = async () => {
        const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const id = await this.getId()
        cart.push({
            id,
            products: []
        })
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    getId = async () => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
        return maxId + 1;
    }

    getCart = async (cid) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const cartId = carts.filter(cart => cart.id === cid);
        return (cartId)
    }


    addProductToCart = async (cid, pid) => {
        let respuesta;
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if (!carts.length) return null
        const cartId = carts.filter(cart => cart.id == cid)
        if (cartId.length == 0) return ("Carrito no encontrado")
        const prodId = cartId[0].products.filter(prod => prod.id == pid)
        if (prodId.length == 0) {
            const checkIdExist = await nuevaInstancia.getProductById(pid)
            if (checkIdExist) {
                cartId[0].products.push({
                    id: pid,
                    quantity: 1
                });
                respuesta = "Producto creado"
            } else {
                respuesta = "No existe el producto. Imposible agregar al carrito"
            }
        } else {
            const modificoCantidad = cartId[0].products.find(prod => prod.id == pid)
            modificoCantidad.quantity = Number(modificoCantidad.quantity) + 1
            respuesta = `Cantidad aumentada, el producto ${pid} ahora tiene ${modificoCantidad.quantity} unidades`

        }
        await fs.writeFile(this.path, JSON.stringify(carts))
        return respuesta;
    }

    /*
    [
    {id: 1, productos: [{id: 2, quantity: 2},{id: 3, quantity: 2},{id: 4, quantity: 2}]},
    {id: 2, productos:[{producto: id},{producto: id},{producto: id}]},
    {3, [{producto: id},{producto: id},{producto: id}]}
    ]
    */
}

const nuevoCarrito = new cartManager('./src/data/cart.json')

export default nuevoCarrito