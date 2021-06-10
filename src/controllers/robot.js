const moment            = require('moment')
const initNFs           = require('../metodsDB/initNFs')
const initTransporte    = require('../metodsDB/initTransporte')
const initTransferencia = require('../metodsDB/initTransferencia')
const initChegada       = require('../metodsDB/initChegada')
const initEmRota        = require('../metodsDB/initEmRota')
const initEntrega       = require('../metodsDB/initEntrega')
const initOcorrencias   = require('../metodsDB/initOcorrencias')
const initComprovante   = require('../metodsDB/initComprovante')
const encerraProcessos  = require('../metodsDB/encerraProcessos')
const registraNF        = require('../models/registraNF')
const transfereNF       = require('../models/transfereNF')
const chegadaNF         = require('../models/chegadaNF')
const rotaEntrega       = require('../models/rotaEntrega')
const entregaNF         = require('../models/entregaNF')
const ocorrencias       = require('../models/ocorrencias')
const comprovante       = require('../models/comprovante')

const logEventos = (cfg,msg,ret) => {
   if(cfg.debug=='ON' || ret.success || ret.rowsAffected==-1 ) {
      if(ret.rowsAffected==-1) {
         console.error(moment().format(),'-',msg,ret)
      } else {
         console.log(moment().format(),'-',msg,ret) 
      }   
   }
}

const robot = async (cli,cfg,uptime) =>{
   let timeOUT = Math.ceil((process.uptime()-2) - uptime)
   
    // CONTROLE DE EXECUÇÃO
    if( cli.count <=0 ){
         clearInterval(cli.fnTime);
         console.log(moment().format(),`- ( TOKEN VENCIDO  ) - ${cli.login.resposta.token} - Time: ${timeOUT}s - `,cli.nome)
         return 
    } else {
         console.log(moment().format(),'- Robô em Execução:',cli.count,' - ',timeOUT,'s')
    }
    cli.count--

    // CAPTURA NFs 
    let retInitNFs = await initNFs(cli)
    logEventos(cfg,'(BD - CAPTURA NFs) - retInitNFs:',retInitNFs) 

    // PROCESSO DE TRANSPORTE INICIADO
    let retInitTransporte = await initTransporte()
    logEventos(cfg,'(BD - PROCESSO DE TRANSPORTE INICIADO) - retInitTransporte:',retInitTransporte)

    let retRegistraNF = await registraNF(cfg,cli)
    logEventos(cfg,'(API - REGISTRO NF) - retRegistraNF:',retRegistraNF)

    if(retInitNFs.rowsAffected>0) {
       return 
    }
 
    // EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    let retInitTransferencia = await initTransferencia()
    logEventos(cfg,'(BD - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS) - retInitTransferencia:',retInitTransferencia)

    let retTransfereNF = await transfereNF(cfg,cli)
    logEventos(cfg,'(API - TRANSFERENCIA ENTRE FILIAIS) - retTransfereNF:',retTransfereNF)

    // CHEGADA NA CIDADE OU FILIAL DE DESTINO
    let retInitChegada = await initChegada()
    logEventos(cfg,'(BD - CHEGADA NA CIDADE OU FILIAL DE DESTINO) - retInitChegada:',retInitChegada)

    let retChegadaNF = await chegadaNF(cfg,cli)
    logEventos(cfg,'(API - CHEGADA NA FILIAL) - retChegadaNF:',retChegadaNF)
 
    // EM ROTA PARA ENTREGA
    let retInitEmRota = await initEmRota()
    logEventos(cfg,'(BD - EM ROTA PARA ENTREGA) - retInitEmRota:',retInitEmRota)

    let retRotaEntrega = await rotaEntrega(cfg,cli)
    logEventos(cfg,'(API - EM ROTA DE ENTREGA) - retRotaEntrega:',retRotaEntrega)
 
    // OCORRENCIAS MANUAIS
    let retInitOcorrencias = await initOcorrencias()
    logEventos(cfg,'(BD - OCORRENCIAS MANUAIS) - retInitOcorrencias:',retInitOcorrencias)

    let retOcorrencias = await ocorrencias(cfg,cli)
    logEventos(cfg,'(API - OCORRÊNCIAS MANUAIS) - retOcorrencias:',retOcorrencias)

    if(retInitOcorrencias.rowsAffected>0) {
       return 
    }

    // ENTREGA REALIZADA NORMALMENTE
    let retInitEntrega = await initEntrega()
    logEventos(cfg,'(BD - ENTREGA REALIZADA NORMALMENTE) - retInitEntrega:',retInitEntrega)

    let retEntregaNF = await entregaNF(cfg,cli)
    logEventos(cfg,'(API - REGISTRO DE ENTREGA) - retEntregaNF:',retEntregaNF)

    // COMPROVANTE DE ENTREGA
    let retInitComprovante = await initComprovante(cfg,cli)
    logEventos(cfg,'(BD - COMPROVANTE) - retInitComprovante:',retInitComprovante)

    let retComprovante = await comprovante(cfg,cli)
    logEventos(cfg,'(API - COMPROVANTE) - retComprovante:',retComprovante)

    // ENCERRA PROCESSOS
    let retEncerraProcessos = await encerraProcessos()
    logEventos(cfg,'(BD - ENCERRA PROCESSOS) - retEncerraProcessos:',retEncerraProcessos)
 
     return 

}

module.exports = robot
