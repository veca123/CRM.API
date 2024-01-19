var express = require('express')
var router = express.Router()
const contato = require('../src/contato')

/* GET home page. */
router.get('/', function(req, res, next) {
  contato.consultaContato(req, res)
})

router.post('/', function(req, res, next) {
  contato.cadastroContato(req, res)
})

router.put('/', function(req, res, next) {
  contato.alteracaoContato(req,res)
})

router.delete('/', function(req, res, next) {
  contato.cancelarContato(req,res)
})
module.exports = router
