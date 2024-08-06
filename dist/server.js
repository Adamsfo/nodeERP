"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// const express = require('express')
const express_1 = __importDefault(require("express"));
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
require('./database/index');
const cors = require('cors');
const fileupload = require('express-fileupload');
var path = require('path');
var publicDir = path.join(__dirname, 'public');
const errorHandler = require('./middlewares/errorHandler');
const server = (0, express_1.default)();
server.use(cors());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(fileupload());
server.use('/', express_1.default.static(publicDir));
server.use(authRoutes);
server.use(usuarioRoutes);
server.use(errorHandler);
server.get('/', (req, res) => {
    res.send('Hello World');
});
server.listen(process.env.PORT, () => {
    console.log(` - Rodando no endereço : ${process.env.BASE}`);
});
