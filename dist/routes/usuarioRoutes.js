"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const UsuarioController = require('../controllers/UsuarioController');
// router.get('/senha', Auth.private, UsuarioController.index)
router.get('/usuario', authenticate, UsuarioController.getUsuario);
router.post('/usuario', authenticate, UsuarioController.addUsuario);
router.put('/usuario/:id', authenticate, UsuarioController.editUsuario);
router.delete('/usuario/:id', authenticate, UsuarioController.deleteUsuario);
module.exports = router;
