var express = require('express')
var router = express.Router()
const cliente = require('../src/clientes')

/* GET home page. */
router.get('/', function(req, res, next) {
  cliente.consulta(req, res)
})

router.post('/', function(req, res, next) {
  cliente.cadastro(req, res)
})

router.put('/', function(req, res, next) {
  cliente.alteracao(req,res)
})

router.delete('/', function(req, res, next) {
  cliente.cancelar(req,res)
})

module.exports = router
