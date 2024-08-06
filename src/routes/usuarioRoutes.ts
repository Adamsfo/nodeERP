import express from 'express'
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const UsuarioController = require('../controllers/UsuarioController')

// router.get('/senha', Auth.private, UsuarioController.index)
router.get('/usuario', authenticate, UsuarioController.getUsuario)
router.get('/usuariofuncao', authenticate, UsuarioController.getUsuarioFuncao)
router.post('/usuario', authenticate, UsuarioController.addUsuario)
router.put('/usuario/:id', authenticate, UsuarioController.editUsuario)
router.delete('/usuario/:id', authenticate, UsuarioController.deleteUsuario)

module.exports = router