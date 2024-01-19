var express = require('express')
var router = express.Router()
const usuario = require('../src/usuario')

/* GET home page. */
router.get('/', function(req, res, next) {
  usuario.consultaUsuario(req, res)
})

router.post('/', function(req, res, next) {
  usuario.cadastroUsuario(req, res)
})

router.put('/', function(req, res, next) {
  usuario.alteracaoUsuario(req,res)
})

router.delete('/', function(req, res, next) {
  usuario.cancelarUsuario(req,res)
})
module.exports = router
