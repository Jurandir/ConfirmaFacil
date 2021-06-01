//-- Versão Inicial ( 28/05/2021 )
//-- By : Jurandir Ferreira

require('dotenv').config()
const moment = require('moment')

moment.locale('pt-br')        

const colors    = require('colors')
const clientes  = require('./config/clientes.json')
const login     = require('./src/metodsAPI/login')
const robot     = require('./src/controllers/robot')

const config  = { 
    versao: process.env.VERSAO,
    time: process.env.TIME_INTERVALO,
    loginURL: process.env.URL_LOGIN, 
    embarqueURL: process.env.URL_EMBARQUE , 
    user: process.env.USUARIO,
    pwd: process.env.SENHA
}

const titulo  = ` Robô - ConfirmaFacil - ${config.versao} `.yellow.bgBlue.bold 

process.stdout.write('\x1B[2J\x1B[0f')
console.log(titulo)

clientes.forEach(item=>{
    login(config).then( ret => {
        if(ret.success) {
            item.login = ret.data
            item.count = 0
            item.fnTime = setInterval(robot, config.time, item, config)    
        } else {
            console.log('ERRO:',ret)
        }
    })
})
