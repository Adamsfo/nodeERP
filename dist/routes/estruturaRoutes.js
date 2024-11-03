"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const EstruturaTorneioController = require('../controllers/EstruturaTorneioController');
const EstruturaTorneioItemController = require('../controllers/EstruturaTorneioItemController');
// const BlindItemController = require('../controllers/BlindItemController')
router.get('/estrutura', authenticate, EstruturaTorneioController.get);
router.post('/estrutura', authenticate, EstruturaTorneioController.add);
router.put('/estrutura/:id', authenticate, EstruturaTorneioController.edit);
router.delete('/estrutura/:id', authenticate, EstruturaTorneioController.delete);
router.get('/estruturaitem', authenticate, EstruturaTorneioItemController.get);
router.post('/estruturaitem', authenticate, EstruturaTorneioItemController.add);
router.put('/estruturaitem/:id', authenticate, EstruturaTorneioItemController.edit);
router.delete('/estruturaitem/:id', authenticate, EstruturaTorneioItemController.delete);
module.exports = router;
