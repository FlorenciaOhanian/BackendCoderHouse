class Product {
    constructor(codigo, nombre, marca, precio, img, unidades) {
        this.codigo = codigo;
        this.id = Product.incrementarId();
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
        this.unidades = unidades;
        this.cantidad = 1;
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
    constructor() {
        this.productos = [];
    }
    addProduct = (producto) => {
        const checkCod = this.productos.find(product => product.codigo === producto.codigo);
        if (checkCod) {
            return ('Codigo ya existe');
        } else {
            this.productos.push(producto);
            return "Producto agregado"
        }
    }
    getProductos() {
        return this.productos;
    }
    getProductById = (productotId) => {
        const checkId = this.productos.find(product => product.id === productotId);
        if (checkId) {
            return (checkId)
        } else {
            return 'No hay ningun producto con ese id'
        }
    }
}


    const prod1 = new Product("123CDE", "Caño de escape", "KGI", 1800, "../img/caño.jpg", "1 unidad")
    const prod2 = new Product("456AMG", "Amortiguador", "KGI", 2300, "../img/amortiguador.jpg", "1 unidad")
    const prod3 = new Product("789CBR", "Carburador", "KGI", 3600, "../img/carburador.jpg", "1 unidad")


    const nuevaInstancia = new ProductManager
    console.log(prueba.getProductos())
    console.log(prueba.addProduct(prod1))
    console.log(prueba.addProduct(prod2))
    console.log(prueba.addProduct(prod3))
    console.log(prueba.getProductos())
    console.log(prueba.addProduct(prod2))
    console.log(prueba.getProductos())
    console.log(prueba.getProductById(2))
    console.log(prueba.getProductById(5))
