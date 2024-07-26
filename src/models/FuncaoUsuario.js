const { Model, DataTypes } = require('sequelize')

class FuncaoUsuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoUsuario: {
                type: DataTypes.STRING,           
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            modelName: "FuncaoUsuario",
            freezeTableName: true
        })
    }
}

module.exports = FuncaoUsuario;