const axios         = require('axios')

const loadAPI = async (method,endpoint,server,params) => {
    const config = {
        headers: { "Content-Type": 'application/json' }
    }
    let url = server + endpoint
    let dados 
    try {       
        if (method=='POST') {
            ret = await axios.post( url, params, config )
        } else {
            ret = await axios.get( url, { params }, config )
        }
        dados = { success: true, data: ret.data, err: '', url: url }
        return dados
    } catch (err) { 
        if (err.message) {
            dados = { success: false, data: err, err: err.message, url: url }
        } else {
            dados = { success: false, data: err, err: 'loadAPI ERRO', url: url }
        }   
        return dados
    }
}

module.exports = loadAPI
