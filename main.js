import express from 'express';
import Productos from './classProductos.js';
const app = express()
const router = express.Router()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

const server = app.listen(8080, () => {
    console.log(`El servidor está conectado: ${server.address().port}`)
})
server.on('error', (error) => console.log(`Ocurrió un error: ${error}`))

//Espacio publico del servidor
app.use('/public', express.static('public'))
router.get('/public', (req, resp) => {
    resp.sendFile('/public/index.html')
})


//Listado de productos vacio
let listaProductos = []

//Listar todos los productos
router.get('/productos/listar', (req, resp) => {
    
    const productos = new Productos(listaProductos);
    productos.listarProductos()

    if(listaProductos.length < 1){
        throw new Error('No hay productos cargados')
    }

    resp.send(listaProductos)
    
})

//Listar producto individual
router.get('/productos/listar/:id', (req, resp, next) => {
    
    try {
        const productos = new Productos(listaProductos);
        const guardado = productos.listarPorId(req.params.id)

        resp.send(guardado)

    } catch (error) {
        next(error)
    }
})

//Agregar nuevo producto
router.post('/productos/guardar/', (req, resp, next) => {
    try {

        const productos = new Productos(req.body);
        const guardado = productos.guardar(listaProductos)

        listaProductos.push(guardado)
    
        resp.json("Producto agregado correctamente")
        
    } catch (error) {
        next(error)
    }
    
})

//Método para actualizar producto
router.put('/productos/actualizar/:id', (req, resp) => {
    const id = req.params.id
    const productos = new Productos(listaProductos);
    const respuesta = productos.actualizar(id, req.body)

    listaProductos[id] = respuesta

    resp.json(listaProductos)
})

//Método para borrar producto
router.delete('/productos/borrar/:id', (req, resp)=> {
    const id = req.params.id
    const productos = new Productos(listaProductos);
    let eliminado = productos.borrar(id)

    listaProductos = eliminado

    resp.json(listaProductos)
})

