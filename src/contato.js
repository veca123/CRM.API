const db  = require('./pg')

function consultaContato(req, res) {
    let sql = 'SELECT * FROM "cadClienteContato" WHERE "cdCancelado" IS NULL'
    db.client.query(sql,[], function (erro,resultado) {
        if(erro) {
            res.status(401).json(erro)
            return
        }
        if(resultado.rowCount > 0) res.status(200).json(resultado.rows)
    })
}

function cadastroContato(req, res) {
    let sql = `INSERT INTO public."cadClienteContato"(
        "dsContato", "cdCliente", "dsTelefone", "dsCelular", "dsEmail", "dtNascimento", "dsSite")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`
    val = [
        req.body.dsContato,
        req.body.cdCliente,
        req.body.dsTelefone,
        req.body.dsCelular,
        req.body.dsEmail,
        req.body.dtNascimento,
        req.body.dsSite
    ]
    db.client.query(sql,val,function(erro,resultado){
        if (erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Contato do cliente cadastrado com sucesso'})
    })
}

function alteracaoContato(req, res) {
    let sql = 'UPDATE "cadClienteContato" SET "dsContato"= $1, "cdCliente"= $2, "dsTelefone"=$3, "dsCelular"=$4, "dsEmail"=$5, "dtNascimento"= $6, "dsSite"=$7 WHERE "cdClienteContato" = $8 RETURNING *'
    let val = [
        req.body.dsContato,
        req.body.cdCliente,
        req.body.dsTelefone,
        req.body.dsCelular,
        req.body.dsEmail,
        req.body.dtNascimento,
        req.body.dsSite,
        req.query.cdClienteContato
    ]
    db.client.query(sql,val, function (erro, resultado) {
        if(erro){
            res.status(401).json(erro)
            return
        }
        res.status(200).json({msg:'Alteração do contato', dados: resultado.rows[0]})
    })
}
   

    function cancelarContato(req, res) {
        let sql = 'UPDATE "cadClienteContato" SET "cdCancelado"=$1, "dtCancelado"=NOW() WHERE "cdClienteContato"=$2';
        let val = [
            req.query.cdClienteContato, 
            req.query.idUser  
        ];
    
        db.client.query(sql, val, function (erro, resultado) {
            if (erro) {
                res.status(401).json(erro);
                return;
            }
            res.status(200).json({ msg: 'Contato ' + req.query.cdClienteContato + ' Cancelado com Sucesso' });
        });
    }
    

    
module.exports = {
    consultaContato,
    cadastroContato,
    alteracaoContato,
    cancelarContato
}