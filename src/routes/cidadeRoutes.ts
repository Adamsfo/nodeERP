import express from 'express'
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const CidadeController = require('../controllers/CidadeController')

router.get('/cidade', authenticate, CidadeController.getCidade)

module.exports = router