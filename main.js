import express from 'express';
import Productos from './classProductos.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const server = app.listen(8080, () => {
    console.log(`El servidor está conectado: ${server.address().port}`)
})
server.on('error', (error) => console.log(`Ocurrió un error: ${error}`))

const listaProductos = []

//Listar todos los productos
app.get('/api/productos/listar', (req, resp) => {
    
    const productos = new Productos(listaProductos);
    productos.listarProductos()

    if(listaProductos.length < 1){
        throw new Error('No hay productos cargados')
    }

    resp.send(listaProductos)
    
})

//Listar producto individual
app.get('/api/productos/listar/:id', (req, resp, next) => {
    
    try {
        const productos = new Productos(listaProductos);
        const guardado = productos.listarPorId(req.params.id)

        resp.send(guardado)

    } catch (error) {
        next(error)
    }
})

//Agregar nuevo producto
app.post('/api/productos/guardar/', (req, resp, next) => {
    try {

        const productos = new Productos(req.body);
        const guardado = productos.guardar(listaProductos)

        listaProductos.push(guardado)
    
        resp.json(listaProductos)
        
    } catch (error) {
        next(error)
    }
    
})