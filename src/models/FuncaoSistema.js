const { Model, DataTypes } = require('sequelize')

class FuncaoSistema extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoSistema: {
                type: DataTypes.STRING,           
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            modelName: "FuncaoSistema",
            freezeTableName: true
        })
    }
}

module.exports = FuncaoSistema;