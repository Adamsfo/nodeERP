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
import { EstruturaTorneioInit } from '../models/EstruturaTorneio';
const ConfigIniciais = require('./ConfigIniciais')
const FuncaoSistema = require('./FuncaoSistema')

const connection = new Sequelize(dbConfig);

(async () => {
  try {
    // Autenticação da conexão
    await connection.authenticate();
    console.log('Conectado no banco de dados!');

    // Inicializando modelos    
    EmpresaInit(connection)
    UsuarioInit(connection)
    CidadeInit(connection)
    // VeiculoInit(connection)
    ClienteFornecedorInit(connection)
    // ContaAPagarInit(connection)
    // ContaAReceberInit(connection)
    // ContaBancariaInit(connection)
    EstruturaTorneioInit(connection)

    // Sincronizando os modelos com o banco de dados        
    await connection.sync();
    // await connection.sync({ alter: true });

    // Executando configurações iniciais
    await ConfigIniciais.configUsuario();
    await FuncaoSistema.funcaoSistema();

  } catch (error) {
    console.error('Banco de dados não conectado:', error);
  }
})();

module.exports = connection;