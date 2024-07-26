const { Model, DataTypes } = require('sequelize');
const AcessoFuncao = require('./AcessoFuncao');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            nomeCompleto: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            idAcessoFuncao: {
                type: DataTypes.INTEGER,
                references: {
                    model: AcessoFuncao,
                    key: 'id'
                }
            },
            alterarSenha: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },            
            token: DataTypes.STRING
        }, {
            sequelize,
            modelName: "Usuario",
            freezeTableName: true
        })
    }
}

module.exports = Usuario;