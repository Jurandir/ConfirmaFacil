-- OCORRÊNCIAS MANUAIS
SELECT TOP 10
    -- ROW_NUMBER() OVER(ORDER BY CO.DT_CREATE ASC) AS Row#,
	CO.ID                                        AS FLAG_ID,
	CF.NUMERO                                    AS embarque_numero,
	CF.SERIE                                     AS embarque_serie,
	CF.CHAVE                                     AS embarque_chave,
	FORMAT(CF.DT_EMISSAO,'dd-MM-yyyy')           AS embarque_dtEmissao,
	FORMAT(CF.DT_PREVISAO,'dd-MM-yyyy')          AS embarque_dtPrevisao,
	FORMAT(CF.DT_PREV_ORIGINAL,'dd-MM-yyyy')     AS embarque_dtPrevisaoDestinatario,
	CF.VALOR                                     AS embarque_valor,
	'convencional'                               AS embarque_tipoEnvio,
	CF.EMBARCADOR                                AS embarcador_cnpj,
	DE.NOME                                      AS destinatario_nome,
	CF.EMBARCADOR                                AS destinatario_cnpj,
	DE.EMAIL                                     AS destinatario_email,
	DE.CEP                                       AS destinatario_endereco_cep,
	CD.UF                                        AS destinatario_endereco_uf,
	CD.NOME                                      AS destinatario_endereco_cidade,
	CONCAT(DE.BAIRRO,', ',DE.ENDERECO)           AS destinatario_endereco_logradouro,
	DE.NUMERO                                    AS destinatario_endereco_numero,
	DE.LATITUDE                                  AS destinatario_endereco_latitude,
	DE.LONGITUDE                                 AS destinatario_endereco_longitude,
	CONCAT('TERMACO - ',SUBSTRING(CF.CTRC,1,3))  AS transportadora_nome,
	CF.TRANSPORTADOR                             AS transportadora_cnpj,
	CF.CTRC                                      AS pedido_numero,
	CO.OCORRENCIA_ID                             AS ocorrencia_tipoEntrega,
	CO.OCORRENCIA_NOME                           AS ocorrencia_descricaoTipoEntrega,
	CASE WHEN CO.OCORRENCIA_DATA<=CURRENT_TIMESTAMP THEN FORMAT(CO.OCORRENCIA_DATA,'dd-MM-yyyy') 
	                                                ELSE FORMAT(CURRENT_TIMESTAMP,'dd-MM-yyyy')  END 
	                                             AS ocorrencia_dtOcorrencia,
	CASE WHEN CO.OCORRENCIA_DATA<=CURRENT_TIMESTAMP THEN FORMAT(CO.OCORRENCIA_DATA,'HH:mm:ss') 
	                                                ELSE FORMAT(CURRENT_TIMESTAMP,'HH:mm:ss')  END 
	                                             AS ocorrencia_hrOcorrencia,
	CONCAT('CTRC: ',CF.CTRC)                     AS ocorrencia_comentario,
	CASE WHEN CO.OCORRENCIA_ID=91 THEN FORMAT(CF.DT_PREVISAO,'dd-MM-yyyy') ELSE NULL END 
	                                             AS ocorrencia_dataAgendamento,
	CASE WHEN CO.OCORRENCIA_ID=91 THEN FORMAT(CF.DT_PREVISAO,'HH:mm:ss') ELSE NULL END 
                                                 AS ocorrencia_horaAgendamento
FROM SIC.dbo.CONFIRMAFACILOCORRENCIA CO
JOIN SIC.dbo.CONFIRMAFACIL           CF ON CF.ID           = CO.CONFIRMAFACIL_ID
JOIN CARGASSQL.dbo.CLI               DE ON CF.DESTINATARIO = DE.CGCCPF 
JOIN CARGASSQL.dbo.CID               CD ON CD.CODIGO       = DE.CID_CODIGO 
WHERE CO.FLAG_SEND = 0
  AND CO.OCORRENCIA_ID NOT IN ( 000,001,098,110,128,999 )
  AND CF.FASE_ID < 9
  AND CF.FLAG_COMPROVANTE = 0 -- AINDA NÃO FOI CONFIRMADO A IMAGEM DO COMPROVANTE DE ENTREGA NA API (TERMACO)

--    // 1 - 000 - PROCESSO DE TRANSPORTE INICIADO
--    // 2 - 128 - EM PROCESSO DE TRANSFERENCIA ENTRE AS FILIAIS
--    // 3 - 098 - CHEGADA NA CIDADE OU FILIAL DE DESTINO
--    // 4 - 110 - EM ROTA PARA ENTREGA
--    // 5 - 001 - ENTREGA REALIZADA NORMALMENTE
--    // 6 - 999 - COMPROVANTE DE ENTREGA
--    // 9 - XXX - FINALIZADO
