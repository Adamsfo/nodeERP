"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaAReceber = exports.ContaAReceberInit = void 0;
const sequelize_1 = require("sequelize");
const ClienteFornecedor_1 = require("./ClienteFornecedor");
const Empresa_1 = require("./Empresa");
class ContaAReceber extends sequelize_1.Model {
    static initialize(sequelize) {
        ContaAReceber.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            clientefornecedorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: ClienteFornecedor_1.ClienteFornecedor,
                    key: 'id'
                }
            },
            empresaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa_1.Empresa,
                    key: 'id'
                }
            },
            valor: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            valorRecebido: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            observacao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            dataVencimento: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            dataPagamento: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('Pendente', 'Pago', 'Atrasado', 'Cancelado'),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "ContaAReceber",
            freezeTableName: true
        });
    }
    static associate(models) {
        ContaAReceber.belongsTo(models.ClienteFornecedor, {
            foreignKey: 'clientefornecedorId',
            as: 'clienteFornecedor',
        });
        ContaAReceber.belongsTo(models.Empresa, {
            foreignKey: 'empresaId',
            as: 'empresa',
        });
    }
}
exports.ContaAReceber = ContaAReceber;
const ContaAReceberInit = (sequelize) => {
    ContaAReceber.initialize(sequelize);
    ContaAReceber.associate({ ClienteFornecedor: ClienteFornecedor_1.ClienteFornecedor, Empresa: Empresa_1.Empresa });
};
exports.ContaAReceberInit = ContaAReceberInit;
