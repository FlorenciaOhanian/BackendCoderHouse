import {Router} from "express";
import nuevaInstancia from "../services/product-manager.js";
// import multer from 'multer';

const productRouter = Router()
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'src/public/img')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}${file.originalname}`)
//     }
//     })

//Para que funcione el query con limite es necesario agregar despues de la url ?limit=x  ----> siendo x un valor ingresado por el usuario ejemplo: http://localhost:8080/productos/?limit=5
productRouter.get('/', async (req, res) => {
    const misProductos = await nuevaInstancia.getProductos()
    const limit = req.query.limit;
    if (limit) {
        const limitaProductos = misProductos.slice(0, parseInt(limit));
        res.status(200).send(limitaProductos);
    } else {
        res.status(200).send(misProductos);
    }
})

productRouter.get('/:id', async (req, res) => {
    const params = req.params;

    const miProductoId = await nuevaInstancia.getProductById(parseInt(params.id))
    if (!miProductoId) {
        res.status(404).send("Producto no encontrado");
    } else {
        res.status(200).send(miProductoId);
    }
})

productRouter.post('/', async (req, res) => {
    const {codigo, nombre, marca, precio, img, unidades, categoria} = req.body;
    
    const confirmacion = await nuevaInstancia.getProductByCode(codigo)
    
    if (confirmacion){
            res.status(404).send("Este producto ya existe")
        } else {
        await nuevaInstancia.addProduct(codigo, nombre, marca, precio, img, unidades, categoria)
        res.status(200).send("Producto creado")
    }
})


productRouter.put('/:id',  async (req,res) => {
const {id} = req.params;
const miProductoId = await nuevaInstancia.getProductById(parseInt(id))
if (!miProductoId) {
    res.status(404).send("Producto no encontrado");
} else {
    await nuevaInstancia.updateProduct(parseInt(id));
    res.status(200).send("Producto actualizado")
}
})

productRouter.delete('/:id',  async (req,res) => {
    const {id} = req.params;
    const miProductoId = await nuevaInstancia.getProductById(parseInt(id))
    // console.log(miProductoId)
    if (!miProductoId) {
        res.status(404).send("Producto no encontrado");
    } else {
        await nuevaInstancia.deleteProduct(parseInt(id));
        res.status(200).send("Producto eliminado")
    }
    })
export default productRouter