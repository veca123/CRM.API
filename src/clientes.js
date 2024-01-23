const db  = require('./pg')

function consulta(req, res) {
    let sql = 'SELECT * FROM "cadCliente" WHERE "cdCancelado" IS NULL'
    db.client.query(sql,[], function (erro,resultado) {
        if(erro) {
            res.status(401).json(erro)
            return
        }
        if(resultado.rowCount > 0) res.status(200).json(resultado.rows)
    })
}

function cadastro(req, res) {
    let sql = `INSERT INTO public."cadCliente"(
        "dtCadastro", "cdArea", "cdRamoAtividade", "rfCnpjCpf", "idSituacao", "rfInscricaoEstadualRg", "dsNomeFantasia", "dsRazaoSocial", "idTipo", "cdUsuario", "rfIM", "txObservacao")
        VALUES (now(),$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
    let val = [
        req.body.cdArea,
        req.body.cdRamoAtividade,
        req.body.rfCnpjCpf,
        req.body.idSituacao,
        req.body.rfInscricaoEstadualRg,
        req.body.dsNomeFantasia,
        req.body.dsRazaoSocial,
        req.body.idTipo,
        req.body.cdUsuario,
        req.body.rfIM,
        req.body.txObservacao
    ]
    db.client.query(sql,val, function (erro, resultado) {
        if(erro) {
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Cliente cadastrado com sucesso'})
    })    
}

function alteracao(req, res) {
    let sql = 'UPDATE "cadCliente" SET "cdArea"= $1, "cdRamoAtividade"= $2, "rfCnpjCpf"=$3, "idSituacao"=$4, "rfInscricaoEstadualRg"=$5, "dsNomeFantasia"= $6, "dsRazaoSocial"=$7,"idTipo" =$8 ,"cdUsuario" =$9, "txObservacao" = $10 WHERE "cdCliente" = $11 RETURNING *'
    	let val = [
        req.body.cdArea,
        req.body.cdRamoAtividade,
        req.body.rfCnpjCpf,
        req.body.idSituacao,
        req.body.rfInscricaoEstadualRg,
        req.body.dsNomeFantasia,
        req.body.dsRazaoSocial,
        req.body.idTipo,
        req.body.cdUsuario,
        req.body.txObservacao,
        req.query.cdCliente
    ]
    db.client.query(sql,val, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Alteração de cliente', dados: resultado.rows[0]})
    })
}

function cancelar(req, res) {
    let sql = 'UPDATE "cadCliente" SET "cdCancelado" = $1, "dtCancelado" = NOW() WHERE "cdCliente" = $2'
    let val=[
        req.query.cdUsuario,
        req.query.cdCliente
    ]
    db.client.query(sql,val, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Cliente ' + req.query.cdCliente + ' Cancelado com Sucesso'})
    })
    
}
module.exports = {
    consulta,
    cadastro,
    alteracao,
    cancelar
}