const FS = require('fs')

class LogsChat{
    guardar(logs){
        const logsString = Object.values(logs).toString()
        
        try {
            const leer = FS.readFileSync('./logs.txt', 'utf-8')
            
            if(leer === ""){
                FS.writeFileSync('./logs.txt', logsString)
            }else{
                FS.appendFileSync('./logs.txt', `[${logsString}] `)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports.LogsChat = LogsChat