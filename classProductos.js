
export default class Productos{
    constructor(arr){
        this.arr = arr
    }

    listarProductos(){
        return this.arr
    }

    listarPorId(id){
        const listado = Object.entries(this.arr)

        if(id > listado.length){
            throw new Error('Producto no encontrado')
        }
        
        return listado[id]
    }

    guardar(listado){

        const producto = {
            title: this.arr.title,
            price: this.arr.price,
            thumbnail: this.arr.thumbnail,
            id: listado.length
        }

        return producto;
    }
}