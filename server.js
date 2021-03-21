import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Productos from './classProductos.js';
import handlebars from 'express-handlebars';

const app = express()
const router = express.Router()

//Configuración express
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

/*
Comentario de prueba para branch motor-ejs
*/

//Configuración handlebars
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
}))
app.set('view engine', 'hbs')
app.set('views', './views')

//Espacio publico del servidor
app.use('/public', express.static('public'))
router.get('/public', (req, resp) => {
    resp.sendFile('/public/index.html')
    resp.sendFile('/public/style.css')
})


//Servidor puerto 8080
const server = app.listen(8080, () => {
    console.log(`El servidor está conectado: ${server.address().port}`)
})
server.on('error', (error) => console.log(`Ocurrió un error: ${error}`))


//Endopint para vista con handlebar
router.get('/productos/vista', (req, resp) => {
    resp.render('main', {
        data: true,
        producto: listaProductos
    })
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

    resp.json(listaProductos.flat(1))
    
})

//Listar producto individual
router.get('/productos/listar/:id', (req, resp, next) => {
    
    try {
        const productos = new Productos(listaProductos);
        const guardado = productos.listarPorId(req.params.id)

        resp.json(guardado)

    } catch (error) {
        next(error)
    }
})

//Agregar nuevo producto
let id = 0;
router.post('/productos/guardar/', (req, resp, next) => {
    try {
        id++
        const productos = new Productos(req.body);
        const guardado = productos.guardar(id)

        listaProductos.push(guardado)
    
        resp.redirect('/public');
        
    } catch (error) {
        next(error)
    }
    
})

//Método para actualizar producto
router.put('/productos/actualizar/:id', (req, resp) => {
    
    const id = req.params.id
    const productos = new Productos(listaProductos);
    const respuesta = productos.actualizar(id, req.body)

    listaProductos = respuesta

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

