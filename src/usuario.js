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
    let sql = 'UPDATE "cfgUsuario" SET "dsUsuario" =$1,"dsLogon"=$2 , "dsSenha"=$3 WHERE "cdUsuario" =$4 RETURNING *'
    let val =[
        req.body.dsUsuario,
        req.body.dsLogon,
        req.body.dsSenha,
        req.query.cdUsuario
    ]
    db.client.query(sql,val, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Alteração do Usuario', dados: resultado.rows[0]})
    })
}    

function cancelarUsuario(req, res) {
    let sql = 'UPDATE "cfgUsuario" SET "cdCancelado" = $1, "dtCancelado" = NOW() WHERE "cdUsuario" = $2'
    let valor=[
        req.query.cdUsuario,
        req.query.idUser
    ]
    db.client.query(sql,valor, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Usuario ' + req.query.cdUsuario + ' Cancelado com Sucesso'})
    })
}
module.exports = {
    consultaUsuario,
    cadastroUsuario,
    alteracaoUsuario,
    cancelarUsuario
}