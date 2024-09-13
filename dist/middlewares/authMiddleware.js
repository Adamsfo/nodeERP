"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
// const CustomError = require("../utils/customError");
import { CustomError } from '../utils/customError'
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Suporta "Bearer <token>"
    if (!token) {
        throw new CustomError('Token de autenticação não fornecido.', 401, '');
        // return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }
    try {
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        req.user = decoded; // Adiciona usuário decodificado ao req
        next();
    }
    catch (error) {
        throw new CustomError('Token de autenticação inválido.', 403, '');
        // return res.status(403).json({ message: 'Token de autenticação inválido.' });
    }
};
module.exports = { authenticate };
