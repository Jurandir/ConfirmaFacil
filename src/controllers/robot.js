const moment            = require('moment')
const initNFs           = require('../metodsDB/initNFs')
const initTransporte    = require('../metodsDB/initTransporte')
const initTransferencia = require('../metodsDB/initTransferencia')
const initChegada       = require('../metodsDB/initChegada')
const initEmRota        = require('../metodsDB/initEmRota')
const initEntrega       = require('../metodsDB/initEntrega')
const initOcorrencias   = require('../metodsDB/initOcorrencias')
const initComprovante   = require('../metodsDB/initComprovante')
const registraNF        = require('../models/registraNF')
const transfereNF       = require('../models/transfereNF')
const chegadaNF         = require('../models/chegadaNF')
const rotaEntrega       = require('../models/rotaEntrega')
const entregaNF         = require('../models/entregaNF')
const ocorrencias       = require('../models/ocorrencias')
const comprovante       = require('../models/comprovante')

const robot = async (cli,cfg) =>{

    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
    // 4 - 110 - EM ROTA PARA ENTREGA
    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
    // 6 - 999 - COMPROVANTE DE ENTREGA
    // 9 - XXX - FINALIZADO
   
    // PRINT EXECUÇÃO
    console.log(moment().format(),'- Robô em Execução:',cli.count)
    if( cli.count<=0 ){
        clearInterval(cli.fnTime);
        console.log(moment().format(),`FIM VALIDADE TOKEN - ${cli.login.resposta.token} -`,cli.nome)
        return 
    }
    cli.count--

    // CAPTURA NFs 
    let retInitNFs = await initNFs(cli)
     console.log(moment().format(),'- (BD - CAPTURA NFs) - retInitNFs:',retInitNFs) 

    // PROCESSO DE TRANSPORTE INICIADO
    let retInitTransporte = await initTransporte()
     console.log(moment().format(),'- (BD - PROCESSO DE TRANSPORTE INICIADO) - retInitTransporte:',retInitTransporte)

     let retRegistraNF = await registraNF(cfg,cli)
     console.log(moment().format(),'- (API - REGISTRO NF) - retRegistraNF:',retRegistraNF)

     if(retInitNFs.rowsAffected>0) {
        return 
     }
 
    // EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    let retInitTransferencia = await initTransferencia()
     console.log(moment().format(),'- (BD - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS) - retInitTransferencia:',retInitTransferencia)

     let retTransfereNF = await transfereNF(cfg,cli)
     console.log(moment().format(),'- (API - TRANSFERENCIA ENTRE FILIAIS) - retTransfereNF:',retTransfereNF)

    // CHEGADA NA CIDADE OU FILIAL DE DESTINO
    let retInitChegada = await initChegada()
     console.log(moment().format(),'- (BD - CHEGADA NA CIDADE OU FILIAL DE DESTINO) - retInitChegada:',retInitChegada)

     let retChegadaNF = await chegadaNF(cfg,cli)
     console.log(moment().format(),'- (API - CHEGADA NA FILIAL) - retChegadaNF:',retChegadaNF)
 
    // EM ROTA PARA ENTREGA
    let retInitEmRota = await initEmRota()
     console.log(moment().format(),'- (BD - EM ROTA PARA ENTREGA) - retInitEmRota:',retInitEmRota)

     let retRotaEntrega = await rotaEntrega(cfg,cli)
     console.log(moment().format(),'- (API - EM ROTA DE ENTREGA) - retRotaEntrega:',retRotaEntrega)
 
    // OCORRENCIAS MANUAIS
    let retInitOcorrencias = await initOcorrencias()
     console.log(moment().format(),'- (BD - OCORRENCIAS MANUAIS) - retInitOcorrencias:',retInitOcorrencias)

     let retOcorrencias = await ocorrencias(cfg,cli)
     console.log(moment().format(),'- (API - OCORRÊNCIAS MANUAIS) - retOcorrencias:',retOcorrencias)

     if(retInitOcorrencias.rowsAffected>0) {
        return 
     }

     // ENTREGA REALIZADA NORMALMENTE
    let retInitEntrega = await initEntrega()
     console.log(moment().format(),'- (BD - ENTREGA REALIZADA NORMALMENTE) - retInitEntrega:',retInitEntrega)

     let retEntregaNF = await entregaNF(cfg,cli)
     console.log(moment().format(),'- (API - REGISTRO DE ENTREGA) - retEntregaNF:',retEntregaNF)

    // COMPROVANTE DE ENTREGA
     let retInitComprovante = await initComprovante(cfg,cli)
     console.log(moment().format(),'- (BD - COMPROVANTE) - retInitComprovante:',retInitComprovante)

     let retComprovante = await comprovante(cfg,cli)
     console.log(moment().format(),'- (API - COMPROVANTE) - retComprovante:',retComprovante)
 
     return 

}

module.exports = robot
