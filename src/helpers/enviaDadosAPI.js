const sqlQuery             = require('../connection/sqlQuery')
const montaJSON            = require('./montaJSON')
const embarque             = require('../metodsAPI/embarque')
const updFlagsEnvio        = require('../metodsDB/updFlagsEnvio')

const enviaDadosAPI = async (cfg,cli,base,sql) => {
    let resposta = { success: false, rowsAffected: 0 }
    let ROWS = 0
    let LIST = 0
    let EMBARQUE = {success: false}
    let UPDATE   = {success: false, rowsAffected: 0}
    try {
        ROWS      = await sqlQuery( sql )
        LIST      = ROWS.length >0   ? await montaJSON( ROWS, base )    : []
        EMBARQUE  = LIST.length >0   ? await embarque( cfg, cli, LIST ) : {success: false, message:'embarque' ,rowsAffected: 0} 
        UPDATE    = EMBARQUE.success ? await updFlagsEnvio( ROWS )      : {success: false, message:'updFlagsEnvio' ,rowsAffected: 0}
        
        let msg = `Query:${ROWS.length} JSON:${LIST.length} API:${EMBARQUE.success} Flag:${UPDATE.success}`

        resposta  = { success: UPDATE.success, message: msg,  rowsAffected: UPDATE.rowsAffected }

    } catch (err) {
        resposta = { success: false, message: err.message, rowsAffected:-1 }
    }    
    return resposta
}

module.exports = enviaDadosAPI