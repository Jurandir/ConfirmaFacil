const moment            = require('moment')
const initNFs           = require('../metodsDB/initNFs')
const initTransporte    = require('../metodsDB/initTransporte')
const initTransferencia = require('../metodsDB/initTransferencia')
const initChegada       = require('../metodsDB/initChegada')
const initEmRota        = require('../metodsDB/initEmRota')
const initEntrega       = require('../metodsDB/initEntrega')
const initOcorrencias   = require('../metodsDB/initOcorrencias')
const registraNF        = require('../models/registraNF')
const transfereNF       = require('../models/transfereNF')
const chegadaNF         = require('../models/chegadaNF')
const rotaEntrega       = require('../models/rotaEntrega')
const entregaNF         = require('../models/entregaNF')
const ocorrencias       = require('../models/ocorrencias')

const robot = async (cli,cfg) =>{

    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
    // 4 - 110 - EM ROTA PARA ENTREGA
    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
    // 6 - 999 - COMPROVANTE DE ENTREGA
    // 9 - XXX - FINALIZADO
   
    // PRINT EXECUÇÃO
    console.log(moment().format(),'- Execução:',cli.count)
    if(cli.count==1){
        clearInterval(cli.fnTime);
        console.log('FIM - ',cli.nome)
        return 
    }
    cli.count++

    let retRegistraNF = await registraNF(cfg,cli)
    console.log(moment().format(),'- (API - REGISTRO NF) - retRegistraNF:',retRegistraNF)

    let retTransfereNF = await transfereNF(cfg,cli)
    console.log(moment().format(),'- (API - TRANSFERENCIA ENTRE FILIAIS) - retTransfereNF:',retTransfereNF)

    let retChegadaNF = await chegadaNF(cfg,cli)
    console.log(moment().format(),'- (API - CHEGADA NA FILIAL) - retChegadaNF:',retChegadaNF)

    let retRotaEntrega = await rotaEntrega(cfg,cli)
    console.log(moment().format(),'- (API - EM ROTA DE ENTREGA) - retRotaEntrega:',retRotaEntrega)

    let retOcorrencias = await ocorrencias(cfg,cli)
    console.log(moment().format(),'- (API - OCORRÊNCIAS MANUAIS) - retOcorrencias:',retOcorrencias)

    let retEntregaNF = await entregaNF(cfg,cli)
    console.log(moment().format(),'- (API - REGISTRO DE ENTREGA) - retEntregaNF:',retEntregaNF)

    return

    // CAPTURA NFs 
    let retInitNFs = await initNFs(cli)
     console.log(moment().format(),'- (CAPTURA NFs) - retInitNFs:',retInitNFs)

    // PROCESSO DE TRANSPORTE INICIADO
    let retInitTransporte = await initTransporte()
     console.log(moment().format(),'- (PROCESSO DE TRANSPORTE INICIADO) - retInitTransporte:',retInitTransporte)

    // EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    let retInitTransferencia = await initTransferencia()
     console.log(moment().format(),'- (EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS) - retInitTransferencia:',retInitTransferencia)

    // CHEGADA NA CIDADE OU FILIAL DE DESTINO
    let retInitChegada = await initChegada()
     console.log(moment().format(),'- (CHEGADA NA CIDADE OU FILIAL DE DESTINO) - retInitChegada:',retInitChegada)

    // EM ROTA PARA ENTREGA
    let retInitEmRota = await initEmRota()
     console.log(moment().format(),'- (EM ROTA PARA ENTREGA) - retInitEmRota:',retInitEmRota)

    // OCORRENCIAS MANUAIS
    let retInitOcorrencias = await initOcorrencias()
     console.log(moment().format(),'- (OCORRENCIAS MANUAIS) - retInitOcorrencias:',retInitOcorrencias)
     if(retInitOcorrencias.rowsAffected>0) {
        cli.count--
        return 
     }

     // ENTREGA REALIZADA NORMALMENTE
    let retInitEntrega = await initEntrega()
     console.log(moment().format(),'- (ENTREGA REALIZADA NORMALMENTE) - retInitEntrega:',retInitEntrega)

     return 

}

module.exports = robot
