const { Model, DataTypes } = require('sequelize');
const FuncaoSistema = require('./FuncaoSistema');

class AcessoFuncao extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idFuncaoSistema: {
                type: DataTypes.INTEGER,
                references: {
                    model: FuncaoSistema,
                    key: 'id'
                }
            },
            idFuncaoUsuario: {
                type: DataTypes.INTEGER,
                references: {
                    model: AcessoFuncao,
                    key: 'id'
                }
            },            
        }, {
            sequelize,
            modelName: "AcessoFuncao",
            freezeTableName: true
        })
    }
}

module.exports = AcessoFuncao;