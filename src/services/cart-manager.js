import {
    promises as fs
} from 'fs'

class cartManager {
    constructor(path) {
        this.path = path;
    }

    createCart = async () => {
    const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const id = await this.getId()
        cart.push({ id, products: [] })
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    getId = async () => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
        return maxId + 1;
    }

    getCart = async (cid) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const cartId = carts.filter(cart => cart.id === cartId);
        return (cartId)
    }


    addProductToCart = async (cid, pid) => {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if (!carts.length) return null
        const cartId = carts.filter(cart => cart.id == cid)
        if (cartId.length == 0) return ("Carrito no encontrado")
        const prodId = cartId.productos.filter(prod => prod.id == pid)
        if (prodId.length == 0) {
            cartId.productos.push({
                id: pid,
                quantity: 1
            })
            return ("Producto creado")
        } else {
            const modificoCantidad = cartId.productos.filter(prod => ({
                id: prod.id,
                quantity: Number(prod.quantity) + 1
            }))
            const newCart = {
                ...cartId.id,
                productos: [...modificoCantidad]
            }
        }
        await fs.writeFile(this.path, JSON.stringify(newCart))
        return ("Producto modificado")
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