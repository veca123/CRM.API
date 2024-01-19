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
    res.status(200).json({msg:'Alteração do contato'})
}

    function cancelarContato(req, res) {
        console.log("cdClienteContato:", req.query.cdClienteContato);
        console.log("cdCliente:", req.query.cdCliente);
        let sql = 'UPDATE "cadClienteContato" SET "cdCancelado"=$1, "dtCancelado"=NOW() WHERE "cdCliente"=$2';
        let val = [
            req.query.cdClienteContato, 
            req.query.cdCliente  
        ];
    
        db.client.query(sql, val, function (erro, resultado) {
            if (erro) {
                res.status(401).json(erro);
                return;
            }
            res.status(200).json({ msg: 'Contato ' + req.query.cdCliente + ' Cancelado com Sucesso' });
        });
    }
    

    
module.exports = {
    consultaContato,
    cadastroContato,
    alteracaoContato,
    cancelarContato
}