-----------------------------------------------------------------------
    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
    // 4 - 110 - EM ROTA PARA ENTREGA
    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
    // 6 - 999 - COMPROVANTE DE ENTREGA
    // 9 - XXX - FINALIZADO
-----------------------------------------------------------------------

88610191000405	EBERLE S/A
88610191003927	MUNDIAL S A PRODUTOS DE CONSUMO

12744404000500 MUNDIAL DIST DE PRODUTOS DE CONSUMO LTDA
12744404000179 MUNDIAL DIST DE PRODUTOS DE CONSUMO LTDA



Exemplo com quantidade "mínima" de atributos para inserir uma ocorrência, o qual, segue abaixo:
JSON
[
   {
      "embarque":{
         "numero":"479197",
         "serie":"1"
      },
      "embarcador":{
         "cnpj":"88610191000405"
      },
      "ocorrencia":{
         "tipoEntrega":"1",
         "dtOcorrencia":"30/04/2021",
         "hrOcorrencia":"10:55:40"
      },
      "transportadora": {
         "cnpj": "5592303000164"
      }
   }
]

OBS: Para envio das ocorrências agendadoras, é obrigatório informar no objeto "ocorrencia" os atributos:
"dataAgendamento": "DD-MM-AAAA ou DD/MM/AAAA",
"horaAgendamento": "HH:MM:SS"
Quaisquer dúvidas, favor entrar em contato.
Atenciosamente,

 
Valtilaine da R. Silva
valtilaine.silva@mundial.com

Analista Customer Service 
Tel: (35)3435-7108
Ramal: 3006
Mundial SA – Extrema MG
www.mundial.com