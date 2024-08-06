"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
// const { UsuarioInit } = require('../models/Usuario')
const Usuario_1 = require("../models/Usuario");
const ConfigIniciais = require('./ConfigIniciais');
const connection = new Sequelize(dbConfig);
(async () => {
    try {
        // Autenticação da conexão
        await connection.authenticate();
        console.log('Conectado no banco de dados!');
        // Inicializando modelos
        (0, Usuario_1.UsuarioInit)(connection);
        // Sincronizando os modelos com o banco de dados        
        await connection.sync({ alter: true });
        // Executando configurações iniciais
        await ConfigIniciais.configUsuario();
    }
    catch (error) {
        console.error('Banco de dados não conectado:', error);
    }
})();
module.exports = connection;
