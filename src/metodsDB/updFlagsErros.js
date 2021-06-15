const moment  = require('moment')
const sqlExec = require('../connection/sqlExec')

const updFlagsErros = async (dados,response) => {
    let IDs = dados.map( item => item.FLAG_ID).join()
    
    let list      = response.data.message
    let code      = response.data.status
    let flag      = code==200 ? 1 : 2
    let protocolo = response.data.protocolo
    let message   = ''
    list.map( item => {
        let sql = `UPDATE SIC.dbo.CONFIRMAFACILOCORRENCIA 
                      SET FLAG_SEND          = ${flag},
                          DT_SEND            = CURRENT_TIMESTAMP,
                          RESPOSTA_MSG       = '${item.message}',
                          RESPOSTA_STATUS    = '${code}',
                          RESPOSTA_PROTOCOLO = '${protocolo}'
                    WHERE ID = (${dados[item.posicao].FLAG_ID})`
        try {

            let result = await sqlExec(sql)         
            if( result.success ) {
                console.log(moment().format(),'- STATUS BD: ',dados[item.posicao].FLAG_ID, item.message )
            } else {
                console.log(moment().format(),'- FALHA UPD FLAG - SQL DB:',sql )
            }

            return result
    
        } catch (err) {
            let Erro = {
                success: false,
                message: err.message,
                rowsAffected: -1,
                rotine: 'updFlagsErros',
                sql: sql,
                err: err
            }
            console.log(moment().format(),'- ERRO UPD FLAG - SQL DB:',err.message,sql )
            return Erro
        }
})

}

module.exports = updFlagsErros
