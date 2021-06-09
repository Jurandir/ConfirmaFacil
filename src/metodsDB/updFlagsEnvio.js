const moment  = require('moment')
const sqlExec = require('../connection/sqlExec')

const updFlagsEnvio = async (dados) => {
    let IDs = dados.map( item => item.FLAG_ID).join()
    let sql = `UPDATE SIC.dbo.CONFIRMAFACILOCORRENCIA 
                SET FLAG_SEND = 1,
                    DT_SEND   = CURRENT_TIMESTAMP 
                WHERE ID IN (${IDs})`
    try {

        if(!IDs) {
            return { success: false, message: 'updFlags - Sem Dados', rowsAffected: 0 }     
        }

        let result = await sqlExec(sql)         
        if( result.success ) {
            console.log(moment().format(),'- SUCCESS - ENVIO p/ API, IDs:',IDs )
        } else {
            console.log(moment().format(),'- FALHA UPD FLAG - ENVIO p/ API, IDs:',IDs,'-',result.message )
        }

        return result
  
    } catch (err) {
        let Erro = {
            success: false,
            message: err.message,
            rowsAffected: -1,
            rotine: 'updFlagsEnvio',
            sql: sql,
            err: err
        }
        console.log(moment().format(),'- ERRO UPD FLAG - ENVIO p/ API, IDs:',IDs,'-',err.message )
        return Erro
    }

}

module.exports = updFlagsEnvio
