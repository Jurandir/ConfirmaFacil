-----------------------------------------------------------------------
    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
    // 4 - 110 - EM ROTA PARA ENTREGA
    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
    // 6 - 999 - COMPROVANTE DE ENTREGA
    // 9 - XXX - FINALIZADO
-----------------------------------------------------------------------
000,001,110,128,098

88610191000405	EBERLE S/A
88610191003927	MUNDIAL S A PRODUTOS DE CONSUMO

12744404000500 MUNDIAL DIST DE PRODUTOS DE CONSUMO LTDA
12744404000179 MUNDIAL DIST DE PRODUTOS DE CONSUMO LTDA

-----------------------------------------------------------------------
Retornos observados:
(0,1,98,128) could not execute statement; SQL [n/a]; constraint [INDX_UNIQUE_OC]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement
(0,1,98,128) could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.DataException: could not execute statement
Embarcador não encontrado. (RECUSOU 08789877000549,07222185000128,62270186004577)
(91) Ocorrência agendadora sem data de agendamento
(91,110) Ocorrência com data futura
(0,1,5,26,33,58,79,82,84,91,92,98,110,128) Ocorrência já existe
-----------------------------------------------------------------------

 
Valtilaine da R. Silva
valtilaine.silva@mundial.com

Analista Customer Service 
Tel: (35)3435-7108
Ramal: 3006
Mundial SA – Extrema MG
www.mundial.com


Exemplo 01:

SELECT DISTINCT  
	SUBSTRING(isnull(NFR.CLI_CGCCPF_REMET,'')+CNH.CLI_CGCCPF_REMET,1,14) as EMBARCADOR,
	RIGHT(REPLICATE('0',7) + CAST(NFR.NF AS VARCHAR),7)       as NUMERO,
	NFR.SERIE                                                 as SERIE,
	NFR.CHAVENFE                                              as CHAVE,
	NFR.DATA                                                  as DT_EMISSAO,
	CNH.DATAEMBARQUE                                          as DT_EMBARQUE,
	CNH.DATACHEGADA                                           as DT_CHEGADA,
	CNH.DATAENTREGA                                           as DT_ENTREGA,
	CNH.PREVENTREGA                                           as DT_PREVISAO,
	CNH.PREVENTREGA_ORIGINAL                                  as DT_PREV_ORIGINAL,
	NFR.VALOR                                                 as VALOR,
	CONCAT(CNH.EMP_CODIGO,CNH.SERIE,CNH.CTRC)                 as CTRC,
	CNH.CLI_CGCCPF_DEST                                       as DESTINATARIO,
	EMP.CGC                                                   as TRANSPORTADOR,
	CNH.DATATU                                                as DT_UPDATE,
	0                                                         as FASE_ID
FROM CARGASSQL.dbo.CNH
    JOIN CARGASSQL.dbo.NFR               ON NFR.EMP_CODIGO     = CNH.EMP_CODIGO	AND 
	                                        NFR.CNH_SERIE      = CNH.SERIE	AND 
											NFR.CNH_CTRC       = CNH.CTRC 
    JOIN CARGASSQL.dbo.EMP               ON EMP.CODIGO = CNH.EMP_CODIGO
    JOIN CARGASSQL.dbo.CTE               ON CTE.EMP_CODIGO_CNH = CNH.EMP_CODIGO	AND 
	                                        CTE.CNH_SERIE      = CNH.SERIE	AND 
											CTE.CNH_CTRC       = CNH.CTRC											
	LEFT JOIN SIC.dbo.CONFIRMAFACIL NFE  ON NFE.CHAVE          = NFR.CHAVENFE 


WHERE 
	 (SUBSTRING(CNH.CLI_CGCCPF_PAG,1,8)   = '12744404' OR 
	  SUBSTRING(CNH.CLI_CGCCPF_DEST,1,8)  = '12744404' OR
	  SUBSTRING(CNH.CLI_CGCCPF_REMET,1,8) = '12744404' )
     AND NFR.CHAVENFE = '31210412744404000500550010003468061103078498'

RETORNO API:
{
  "timestamp": "2021-06-11T11:11:43.317",
  "status": 200,
  "message": [
    {
      "message": "Ocorrência salva com sucesso",
      "posicao": 0
    }
  ],
  "path": "/v2/embarque",
  "protocolo": "a1de9323-e9c7-45e6-bcf2-a39fd9a8b0f0"
}