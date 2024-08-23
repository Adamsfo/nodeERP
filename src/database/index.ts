const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
import { EmpresaInit } from '../models/Empresa';
import { UsuarioInit } from '../models/Usuario'
import { CidadeInit } from '../models/Cidade';
import { VeiculoInit } from '../models/Veiculo';
import { ClienteFornecedorInit } from '../models/ClienteFornecedor';
import { ContaAPagarInit } from '../models/ContaAPagar';
import { ContaAReceberInit } from '../models/ContaAReceber';
import { ContaBancariaInit } from '../models/ContaBancaria';
const ConfigIniciais = require('./ConfigIniciais')

const connection = new Sequelize(dbConfig);

(async () => {
  try {
    // Autenticação da conexão
    await connection.authenticate();
    console.log('Conectado no banco de dados!');

    // Inicializando modelos    
    UsuarioInit(connection)
    CidadeInit(connection)
    EmpresaInit(connection)
    VeiculoInit(connection)
    ClienteFornecedorInit(connection)
    ContaAPagarInit(connection)
    ContaAReceberInit(connection)
    ContaBancariaInit(connection)
    
    // Sincronizando os modelos com o banco de dados        
    await connection.sync();
    // await connection.sync({ alter: true });
    
    // Executando configurações iniciais
    await ConfigIniciais.configUsuario();

  } catch (error) {
    console.error('Banco de dados não conectado:', error);
  }
})();

module.exports = connection;