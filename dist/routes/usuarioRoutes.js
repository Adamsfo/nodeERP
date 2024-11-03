"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const UsuarioController = require('../controllers/UsuarioController');
router.get('/funcaosistema', authenticate, UsuarioController.getFuncaoSistema);
router.get('/usuario', authenticate, UsuarioController.getUsuario);
router.post('/usuario', authenticate, UsuarioController.addUsuario);
router.put('/usuario/:id', authenticate, UsuarioController.editUsuario);
router.delete('/usuario/:id', authenticate, UsuarioController.deleteUsuario);
router.get('/funcaousuario', authenticate, UsuarioController.getFuncaoUsuario);
router.post('/funcaousuario', authenticate, UsuarioController.addFuncaoUsuario);
router.put('/funcaousuario/:id', authenticate, UsuarioController.editFuncaoUsuario);
router.delete('/funcaousuario/:id', authenticate, UsuarioController.deleteFuncaoUsuario);
router.get('/funcaousuarioacesso', authenticate, UsuarioController.getFuncaoUsuarioAcesso);
router.post('/funcaousuarioacesso', authenticate, UsuarioController.addFuncaoUsuarioAcesso);
router.delete('/funcaousuarioacesso/:id', authenticate, UsuarioController.deleteFuncaoUsuarioAcesso);
router.get('/usuarioempresa', authenticate, UsuarioController.getUsuarioEmpresa);
router.post('/usuarioempresa', authenticate, UsuarioController.addUsuarioEmpresa);
router.delete('/usuarioempresa/:id', authenticate, UsuarioController.deleteUsuarioEmpresa);
module.exports = router;
