const sqlExec       = require('../connection/sqlExec')

const fs            = require('fs')
const path          = require('path')
const sqlFileName   =  path.join(__dirname, '../../sql/consultas/montaConfirmaFacil.SQL')
const sqlInitNF     = fs.readFileSync(sqlFileName, "utf8")

const faixa_down = '-20'
const faixa_up   = '-19'   

let flag_livre      = true

const initNFs = async (cli) => {
   let raiz = `${cli.cnpj}`.substr(0,8)
   let sql = `
    INSERT INTO SIC.dbo.CONFIRMAFACIL ( EMBARCADOR,	NUMERO, SERIE,
     CHAVE, DT_EMISSAO, DT_EMBARQUE, DT_CHEGADA, DT_ENTREGA, DT_PREVISAO, DT_PREV_ORIGINAL,
     VALOR, CTRC, DESTINATARIO, TRANSPORTADOR, DT_UPDATE, FASE_ID )
    ${sqlInitNF}
    WHERE 
	 (SUBSTRING(CNH.CLI_CGCCPF_PAG,1,8)   = '${raiz}' OR 
	  SUBSTRING(CNH.CLI_CGCCPF_DEST,1,8)  = '${raiz}' OR
	  SUBSTRING(CNH.CLI_CGCCPF_REMET,1,8) = '${raiz}' )
      -- AND CNH.DATATU BETWEEN (CURRENT_TIMESTAMP${faixa_down}) AND (CURRENT_TIMESTAMP${faixa_up})
      -- AND NFR.CHAVENFE = '31210412744404000500550010003468061103078498'
      -- AND NFR.CHAVENFE = '31210512744404000500550010003535611103250001'
      -- AND NFR.CHAVENFE = '31210512744404000500550010003535601103249987'
      -- AND NFR.CHAVENFE = '31210512744404000500550010003535451103247627'
      AND NFR.CHAVENFE = '31210512744404000500550010003535291103246198'
      AND CNH.VALORNF>0
      AND NFR.CHAVENFE IS NOT NULL  
      AND CTE.PROTOCOLOCTE IS NOT NULL
      AND NFE.ID IS NULL
   `
    if(!flag_livre) { return { success: false, message: 'Processo ocupado !!!' }} 
    flag_livre = false
   
    try {

        result = await sqlExec(sql)         
        flag_livre = true
        return result
  
    } catch (err) {
        let Erro = {
            success: false,
            message: err.message,
            rowsAffected: -1,
            rotine: 'initNFs',
            sql: sql,
            err: err
        }
        flag_livre = true
        return Erro
    } 

}

module.exports = initNFs
