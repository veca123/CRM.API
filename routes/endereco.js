var express = require('express')
var router = express.Router()
const endereco = require('../src/endereco')

/* GET home page. */
router.get('/', function(req, res, next) {
  endereco.consultaEndereco(req, res)
})

router.post('/', function(req, res, next) {
  endereco.cadastroEndereco(req, res)
})

router.put('/', function(req, res, next) {
  endereco.alteracaoEndereco(req,res)
})

router.delete('/', function(req, res, next) {
  endereco.cancelarEndereco(req,res)
})
module.exports = router
