import express from 'express'
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const TorneioController = require('../controllers/TorneioController')
const EstruturaTorneioItemController = require('../controllers/EstruturaTorneioItemController')
// const BlindItemController = require('../controllers/BlindItemController')

router.get('/torneio', authenticate, TorneioController.get)
router.post('/torneio', authenticate, TorneioController.add)
router.put('/torneio/:id', authenticate, TorneioController.edit)
router.delete('/torneio/:id', authenticate, TorneioController.delete)

// router.get('/estruturaitem', authenticate, EstruturaTorneioItemController.get)
// router.post('/estruturaitem', authenticate, EstruturaTorneioItemController.add)
// router.put('/estruturaitem/:id', authenticate, EstruturaTorneioItemController.edit)
// router.delete('/estruturaitem/:id', authenticate, EstruturaTorneioItemController.delete)

module.exports = router