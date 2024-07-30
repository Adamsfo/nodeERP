const express = require('express')
const router = express.Router()
const Auth = require('./middlewares/Auth')
const AuthValidator = require('./validators/AuthValidator')
// const AuthController = require('./controllers/AuthController')
const UsuarioController = require('./controllers/UsuarioController')


// router.get('/ping', (req, res) => {
//     res.json({pong: true})
// })

// router.get('/senha', Auth.private, UsuarioController.index)
router.get('/usuario', UsuarioController.getUsuarioT)

module.exports = router