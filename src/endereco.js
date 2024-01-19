const db  = require('./pg')

function consultaEndereco(req, res) {
    let sql = 'SELECT * FROM "cadClienteEndereco" WHERE "cdCancelado" is NULL'
    db.client.query(sql,[],function(erro,resultado) {
        if (erro){
            res.status(401).json(erro)
            return
        }
        if (resultado.rowCount > 0) res.status(200).json(resultado.rows)
    })
}

function cadastroEndereco(req, res) {
    let sql = `INSERT INTO public."cadClienteEndereco"(
        "cdCliente", "rfCep", "dsEndereco", "dsBairro", "rfNumero", "cdCidade", "dsReferencia", "idTipo")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    let val = [
        req.body.cdCliente,
        req.body.rfCep,
        req.body.dsEndereco,
        req.body.dsBairro,
        req.body.rfNumero,
        req.body.cdCidade,
        req.body.dsReferencia,
        req.body.idTipo
    ]
    db.client.query(sql,val,function(erro,resultado){
        if (erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Endereço do cliente cadastrado com sucesso'})
    })  
}

function alteracaoEndereco(req, res) {
    let sql = 
    res.status(200).json({msg:'Alteração do endereço'})
}

function cancelarEndereco(req, res) { // esta dando undefined
    let sql = 'UPDATE "cadClienteEndereco" SET "cdCancelado" = $1, "dtCancelado" = NOW() WHERE "cdClienteEndereco" = $2'
    let valor=[
        req.query.cdClienteEndereco,
        req.query.cdCliente
    ]
    db.client.query(sql,valor, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Endereço ' + req.query.cdClienteEndereco + ' Cancelado com Sucesso'})
    })
}
module.exports = {
    consultaEndereco,
    cadastroEndereco,
    alteracaoEndereco,
    cancelarEndereco
}