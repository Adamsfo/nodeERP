"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Empresa_1 = require("../models/Empresa");
const Usuario_1 = require("../models/Usuario");
const Cidade_1 = require("../models/Cidade");
// import { VeiculoInit } from '../models/Veiculo';
const ClienteFornecedor_1 = require("../models/ClienteFornecedor");
// import { ContaAPagarInit } from '../models/ContaAPagar';
// import { ContaAReceberInit } from '../models/ContaAReceber';
// import { ContaBancariaInit } from '../models/ContaBancaria';
const EstruturaTorneio_1 = require("../models/EstruturaTorneio");
const Torneio_1 = require("../models/Torneio");
const ConfigIniciais = require('./ConfigIniciais');
const FuncaoSistema = require('./FuncaoSistema');
const connection = new Sequelize(dbConfig);
(async () => {
    try {
        // Autenticação da conexão
        await connection.authenticate();
        console.log('Conectado no banco de dados!');
        // ContaAPagarInit(connection)
        // ContaAReceberInit(connection)
        // ContaBancariaInit(connection)
        // VeiculoInit(connection)
        // Inicializando modelos    
        (0, Empresa_1.EmpresaInit)(connection);
        (0, Usuario_1.UsuarioInit)(connection);
        (0, Cidade_1.CidadeInit)(connection);
        (0, ClienteFornecedor_1.ClienteFornecedorInit)(connection);
        (0, EstruturaTorneio_1.EstruturaTorneioInit)(connection);
        (0, Torneio_1.TorneioInit)(connection);
        // Sincronizando os modelos com o banco de dados        
        await connection.sync();
        // await connection.sync({ alter: true });
        // Executando configurações iniciais
        await FuncaoSistema.funcaoSistema();
        await ConfigIniciais.configUsuario();
    }
    catch (error) {
        console.error('Banco de dados não conectado:', error);
    }
})();
module.exports = connection;
