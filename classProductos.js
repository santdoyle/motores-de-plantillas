class Productos{
    constructor(arr){
        this.arr = arr
    }

    listarProductos(){
        return this.arr
    }

    listarPorId(id){
        const listado = this.arr
        const idInt = parseInt(id)

        if(id > this.arr.length){
            throw new Error('Producto no encontrado')
        }

        const lista = listado.find(elem => elem.id === idInt)
        
        return lista
    }
   
    guardar(id){

        const producto = {
            title: this.arr.title,
            price: this.arr.price,
            thumbnail: this.arr.thumbnail,
            id: id
        }

        return producto;
    }

    actualizar(id, nuevaInfo){
        
        if(id > this.arr.length){
            
            throw new Error('El producto indicado no existe')
        
        }else{
            const idInt = parseInt(id)
            
            let index = this.arr.findIndex(elem => elem.id === idInt)

            this.arr[index] = {
                title: nuevaInfo.title,
                price: nuevaInfo.price,
                thumbnail: nuevaInfo.thumbnail,
                id: idInt
            }
    
            return this.arr
        }
        
    }

    borrar(id){
        const idInt = parseInt(id)
        const index = this.arr.findIndex(el => el.id === idInt)
        
        this.arr.splice(index, 1)
        
        return this.arr
    }
}

module.exports.Productos = Productos