const socket = io()

//Tabla de productos con Handlebar
socket.on('mensaje', data => {
    data.forEach(element => {
        
        const template = Handlebars.compile("<tr>"
                                                +"<td>{{producto.id}}</td>"
                                                +"<td>{{producto.title}}</td>"
                                                +"<td>{{producto.price}}</td>"
                                                +'<td><img src={{producto.thumbnail}} class="imgTable"></td>'
                                            +"</tr>");
        // execute the compiled template and print the output to the console
        const html = template({ producto: element });

        const tabla = document.getElementById('miTabla')
        const body = tabla.getElementsByTagName('tbody')[0];
        const row = body.insertRow(0);
        
        row.innerHTML = html
    });
    
})

//Set chat
const verificarEmail = document.getElementById('verificarEmail');

const chat = document.getElementById('chat');
const correo = document.getElementById('correo');
const mensaje = document.getElementById('mensaje');
const ventanaChat = document.getElementById('ventana-chat')

//"Verificación" de correo
verificarEmail.addEventListener('submit', (event) => {
    event.preventDefault()
    
    if(correo.value !== ""){
        chat.classList.remove("hidden");
        mensaje.disabled = false
    }

})

//Envío de mensajes al server
chat.addEventListener('submit', (event) => {
    event.preventDefault();

    const msg = {
        correo: correo.value,
        fecha: moment().format(),
        mensaje: mensaje.value
    }
    mensaje.value = "";
    
    socket.emit('evento-chat', msg)
    
})


//Recibo evento desde el server
socket.on('server-mensaje', (data) => {
    console.log(data)
    let item = document.createElement('LI');
    item.textContent = `${data.correo} [${data.fecha}]:  ${data.mensaje}`
    ventanaChat.appendChild(item)
})