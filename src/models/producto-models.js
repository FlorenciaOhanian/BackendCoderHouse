class productModel {
    constructor(codigo, nombre, marca, precio, img, unidades, categoria) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
        this.unidades = unidades;
        this.cantidad = 1;
        this.categoria = categoria;
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


export default productModel