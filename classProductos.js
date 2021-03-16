import e from "express"

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

    actualizar(id, nuevaInfo){
        const arr = Object.entries(this.arr)
        
        if(id > arr.length){
            
            throw new Error('El producto indicado no existe')
        
        }else{
            arr[id] = {
                title: nuevaInfo.title,
                price: nuevaInfo.price,
                thumbnail: nuevaInfo.thumbnail,
                id: parseInt(id)
            }
    
            return arr[id]
        }
        
    }

    borrar(id){
        const listado = Object.entries(this.arr)
        listado.splice(id, 1)

        return listado
    }
}