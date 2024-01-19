const db  = require('./pg')

function consultaUsuario(req, res) {
    let sql = 'SELECT * FROM "cfgUsuario" WHERE "cdCancelado" IS NULL'
    db.client.query(sql,[],function(erro,resultado) {
        if (erro){
            res.status(401).json(erro)
            return
        }
        if (resultado.rowCount > 0) res.status(200).json(resultado.rows)
    })
}

function cadastroUsuario(req, res) {
    let sql = `INSERT INTO public."cfgUsuario"(
        "dsUsuario", "dsLogon", "dsSenha")
        VALUES ($1, $2, $3)`
    val = [
        req.body.dsUsuario,
        req.body.dsLogon,
        req.body.dsSenha
    ]
    db.client.query(sql,val,function(erro,resultado){
        if (erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Usuário cadastrado com sucesso'})
    })   
}

function alteracaoUsuario(req, res) {
    res.status(200).json({msg:'Alteração do usuário'})
}

function cancelarUsuario(req, res) {
    res.status(200).json({msg:'Cancelar usuário'})
}
module.exports = {
    consultaUsuario,
    cadastroUsuario,
    alteracaoUsuario,
    cancelarUsuario
}