"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaBancaria = exports.ContaBancariaInit = void 0;
const sequelize_1 = require("sequelize");
const Empresa_1 = require("./Empresa");
// Definição do Modelo
class ContaBancaria extends sequelize_1.Model {
    static initialize(sequelize) {
        ContaBancaria.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            banco: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            agencia: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            numeroConta: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            digito: {
                type: sequelize_1.DataTypes.STRING(5),
                allowNull: false,
            },
            tipoConta: {
                type: sequelize_1.DataTypes.ENUM('Corrente', 'Poupança'),
                allowNull: false,
            },
            titular: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            cpfCnpj: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            saldo: {
                type: sequelize_1.DataTypes.DECIMAL(15, 2),
                allowNull: false,
                defaultValue: 0.00,
            },
            convenio: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            carteira: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            empresaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa_1.Empresa,
                    key: 'id'
                }
            }
        }, {
            sequelize,
            modelName: "ContaBancaria",
            freezeTableName: true
        });
    }
    static associate(models) {
        ContaBancaria.belongsTo(models.Empresa, {
            foreignKey: 'empresaId',
            as: 'empresa',
        });
    }
}
exports.ContaBancaria = ContaBancaria;
const ContaBancariaInit = (sequelize) => {
    ContaBancaria.initialize(sequelize);
    ContaBancaria.associate({ Empresa: Empresa_1.Empresa });
};
exports.ContaBancariaInit = ContaBancariaInit;
