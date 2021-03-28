const socket = io()

socket.on('mensaje', data => {
    data.forEach(element => {
        
        console.log(element)
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