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
        LIST      = ROWS>0   ? await montaJSON( ROWS, base )    : 0
        EMBARQUE  = LIST>0   ? await embarque( cfg, cli, LIST ) : {success: false}
        UPDATE    = EMBARQUE ? await updFlagsEnvio( ROWS )      : {success: false, rowsAffected: 0}
        resposta = { success: UPDATE.success, message: '',  rowsAffected: UPDATE.rowsAffected }
    } catch (err) {
        resposta = { success: false, message: err.message, rowsAffected:-1 }
    }    
    return resposta
}

module.exports = enviaDadosAPI