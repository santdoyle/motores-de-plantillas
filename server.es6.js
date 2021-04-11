const express = require('express')
const path = require('path')
const Productos = require('./classProductos.js').Productos
const LogsChat = require('./classLogsChat.js').LogsChat
const handlebars = require('express-handlebars')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()

//Configuración express
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', router)


//Espacio publico del servidor
app.use('/public', express.static('public'))
router.get('/public', (req, resp) => {
    resp.sendFile('/public/index.html')
    resp.sendFile('/public/style.css')
    resp.sendFile('/public/main.js')
})


//Servidor puerto 8080
const server = http.listen(8080, () => {
    console.log(`El servidor está conectado: ${server.address().port}`)
})
server.on('error', (error) => console.log(`Ocurrió un error: ${error}`))

//Conexión a websocket
io.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.emit('mensaje', listaProductos)

    //Recibo el evento del Chat
    socket.on('evento-chat', (data) => {
        console.log(data)
        const logs = new LogsChat()
        logs.guardar(data)
        
        io.emit('server-mensaje', data)

    })
})


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

