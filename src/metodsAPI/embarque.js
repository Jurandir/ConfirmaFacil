const moment  = require('moment')
const loadAPI = require('../helpers/loadAPI')

const embarque = async (cfg,cli,body) => {
    let method   = 'POST'
    let endpoint = ''
    //let server   =  'http://localhost:5000/test/showTest' 
    let server   = cfg.embarqueURL
    let params   = body
    let token    = cli.login.resposta.token
    
    let ret = await loadAPI(method,endpoint,server,params,token)

    if( ret.success ) {
        console.log(moment().format(),'- SUCCESS - API EMBARQUE.','-> ret.data.response.data:',ret.data.response.data)
    } else {
        console.log(moment().format(),'- FALHA - API EMBARQUE.',ret.err,'*',ret.url,'-> ret.data.response.data:',ret.data.response.data )
    }

    return ret

}

module.exports = embarque
