const moment            = require('moment')
const initNFs           = require('../metodsDB/initNFs')
const initTransporte    = require('../metodsDB/initTransporte')
const initTransferencia = require('../metodsDB/initTransferencia')
const initChegada       = require('../metodsDB/initChegada')

const robot = async (cli,cfg) =>{

    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
    // 4 - 110 - EM ROTA PARA ENTREGA
    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
    // 6 - 999 - COMPROVANTE DE ENTREGA
    // 9 - XXX - FINALIZADO

    
    // console.log('CFG:',cfg)
    // console.log('CLI:',cli)

    // PRINT EXECUÇÃO
    console.log(moment().format(),'- Execução:',cli.count)
    if(cli.count==1){
        clearInterval(cli.fnTime);
        console.log('FIM - ',cli.nome)
    }
    cli.count++

    // CAPTURA NFs 
    let retInitNFs = await initNFs(cli)
     console.log(moment().format(),'- retInitNFs:',retInitNFs)

    // PROCESSO DE TRANSPORTE INICIADO
    let retInitTransporte = await initTransporte()
     console.log(moment().format(),'- retInitTransporte:',retInitTransporte)

    // EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    let retInitTransferencia = await initTransferencia()
     console.log(moment().format(),'- retInitTransferencia:',retInitTransferencia)

    // CHEGADA NA CIDADE OU FILIAL DE DESTINO
    let retInitChegada = await initChegada()
     console.log(moment().format(),'- retInitChegada:',retInitChegada)

}

module.exports = robot
