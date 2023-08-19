import {
    Router
} from "express";
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

productRouter.get('/', (req, res) => {
    res.send("Bienvenidos a respuestos KGI")
})


//Para que funcione el query con limite es necesario agregar despues de la url ?limit=x  ----> siendo x un valor ingresado por el usuario ejemplo: http://localhost:8080/productos/?limit=5
productRouter.get('/productos', async (req, res) => {
    const misProductos = await nuevaInstancia.getProductos()
    const limit = req.query.limit;
    if (limit) {
        const limitaProductos = misProductos.slice(0, parseInt(limit));
        res.status(200).send(limitaProductos);
    } else {
        res.status(404).send(misProductos);
    }
})

productRouter.get('/productos/:id', async (req, res) => {
    const params = req.params;

    const miProductoId = await nuevaInstancia.getProductById(parseInt(params.id))
    if (!miProductoId) {
        res.status(404).send("Producto no encontrado");
    } else {
        res.status(200).send(miProductoId);
    }
})

productRouter.post('/productos/', async (req, res) => {
    const body = req.body;
    const confirmacion = await nuevaInstancia.getProductByCode(body.codigo)
    
    if (confirmacion){
            res.status(404).send("Este producto ya existe")
        } else {
        const conf = await nuevaInstancia.addProduct(body)
        if (conf)
        res.status(200("Producto creado"))
    }
})


productRouter.put ('/productos/:id',  async (req,res) => {
const prueba = req.body;
const {id} = req.params;
const miProductoId = await nuevaInstancia.getProductById(parseInt(id))
if (!miProductoId) {
    res.status(404).send("Producto no encontrado");
} else {
    res.status(200).send(miProductoId);
}
})

export default productRouter