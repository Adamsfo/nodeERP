"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const BlindController = require('../controllers/BlindController');
const BlindItemController = require('../controllers/BlindItemController');
router.get('/blind', authenticate, BlindController.get);
router.post('/blind', authenticate, BlindController.add);
router.put('/blind/:id', authenticate, BlindController.edit);
router.delete('/blind/:id', authenticate, BlindController.delete);
router.get('/blinditem', authenticate, BlindItemController.get);
router.post('/blinditem', authenticate, BlindItemController.add);
router.put('/blinditem/:id', authenticate, BlindItemController.edit);
router.delete('/blinditem/:id', authenticate, BlindItemController.delete);
module.exports = router;
