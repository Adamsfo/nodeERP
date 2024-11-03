"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoContaDetalhe = exports.TipoConta = exports.ContaAPagarInit = void 0;
const sequelize_1 = require("sequelize");
const ClienteFornecedor_1 = require("./ClienteFornecedor");
class TipoConta extends sequelize_1.Model {
    static initialize(sequelize) {
        TipoConta.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tipoConta: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "TipoConta",
            freezeTableName: true
        });
    }
}
exports.TipoConta = TipoConta;
class TipoContaDetalhe extends sequelize_1.Model {
    static initialize(sequelize) {
        TipoContaDetalhe.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            detalheTipoConta: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "TipoContaDetalhe",
            freezeTableName: true
        });
    }
}
exports.TipoContaDetalhe = TipoContaDetalhe;
class ContaAPagar extends sequelize_1.Model {
    static initialize(sequelize) {
        ContaAPagar.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            NumeroLancamento: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            Parcela: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            tipoContaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TipoConta,
                    key: 'id'
                }
            },
            tipoContaDetalheId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TipoContaDetalhe,
                    key: 'id'
                }
            },
            clientefornecedorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: ClienteFornecedor_1.ClienteFornecedor,
                    key: 'id'
                }
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            vencimento: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            dataPagamento: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            formaPagamento: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            obs: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            numeroNF: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            serie: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            dataEntrada: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            total: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('pendente', 'pago', 'atrasado'),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "ContaAPagar",
            freezeTableName: true
        });
    }
    static associate(models) {
        ContaAPagar.belongsTo(models.TipoConta, {
            foreignKey: 'tipoContaId',
            as: 'tipoConta',
        });
        ContaAPagar.belongsTo(models.TipoContaDetalhe, {
            foreignKey: 'tipoContaDetalheId',
            as: 'tipoContaDetalhe',
        });
        ContaAPagar.belongsTo(models.ClienteFornecedor, {
            foreignKey: 'clientefornecedorId',
            as: 'clienteFornecedor',
        });
    }
}
const ContaAPagarInit = (sequelize) => {
    TipoConta.initialize(sequelize);
    TipoContaDetalhe.initialize(sequelize);
    ContaAPagar.initialize(sequelize);
    ContaAPagar.associate({ TipoConta, TipoContaDetalhe, ClienteFornecedor: ClienteFornecedor_1.ClienteFornecedor });
};
exports.ContaAPagarInit = ContaAPagarInit;
