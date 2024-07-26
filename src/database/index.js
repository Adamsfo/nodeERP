const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Usuario = require('../models/Usuario')
const FuncaoSistema = require('../models/FuncaoSistema')
const FuncaoUsuario = require('../models/FuncaoUsuario')
const AcessoFuncao = require('../models/AcessoFuncao')
const ConfigIniciais = require('./ConfigIniciais')

const connection = new Sequelize(dbConfig)

// try{
//     connection.authenticate();
//     console.log('Conectado no banco de dados!');
// } catch (error) {
//     console.error('Banco de dados não conectado:', error);
// }

FuncaoSistema.init(connection)
FuncaoUsuario.init(connection)
AcessoFuncao.init(connection)
Usuario.init(connection)

ConfigIniciais.init()

connection.sync({ alter: true })

module.exports = connection;