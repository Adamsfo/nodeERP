"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoFabrica = exports.Modelo = exports.Origem = exports.Combustivel = exports.Motor = exports.Veiculo = exports.Marca = exports.Seguimento = exports.VeiculoInit = void 0;
const sequelize_1 = require("sequelize");
const Empresa_1 = require("./Empresa");
class Seguimento extends sequelize_1.Model {
    static initialize(sequelize) {
        Seguimento.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            seguimento: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Seguimento",
            freezeTableName: true
        });
    }
}
exports.Seguimento = Seguimento;
class Marca extends sequelize_1.Model {
    static initialize(sequelize) {
        Marca.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            marca: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Marca",
            freezeTableName: true
        });
    }
}
exports.Marca = Marca;
// Define o modelo
class Veiculo extends sequelize_1.Model {
    static initialize(sequelize) {
        Veiculo.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            veiculo: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            marcaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Marca, // Nome da tabela de marcas
                    key: 'id',
                },
            },
            segmentoId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Seguimento, // Nome da tabela de segmentos
                    key: 'id',
                },
            },
            inativo: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: "Veiculo",
            freezeTableName: true
        });
    }
    // Define as associações entre os modelos
    static associate(models) {
        // Associação entre Veiculo e Marca
        Veiculo.belongsTo(models.Marca, { foreignKey: 'marcaId' });
        // Associação entre Veiculo e Seguimento
        Veiculo.belongsTo(models.Seguimento, { foreignKey: 'segmentoId' });
    }
}
exports.Veiculo = Veiculo;
class Motor extends sequelize_1.Model {
    static initialize(sequelize) {
        Motor.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            motor: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            cilindradas: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Motor",
            freezeTableName: true
        });
    }
}
exports.Motor = Motor;
class Combustivel extends sequelize_1.Model {
    static initialize(sequelize) {
        Combustivel.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            combustivel: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Combustivel",
            freezeTableName: true
        });
    }
}
exports.Combustivel = Combustivel;
class Origem extends sequelize_1.Model {
    static initialize(sequelize) {
        Origem.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            origem: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Origem",
            freezeTableName: true
        });
    }
}
exports.Origem = Origem;
class Modelo extends sequelize_1.Model {
    static initialize(sequelize) {
        Modelo.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            modelo: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            veiculoId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Veiculo,
                    key: 'id',
                },
            },
            tipoModelo: {
                type: sequelize_1.DataTypes.ENUM('Novo', 'Usado'),
                allowNull: false,
            },
            motorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Motor, // Nome da tabela de motores
                    key: 'id',
                },
            },
            versaoSeries: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            linha: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            anoModelo: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            combustivelId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Combustivel, // Nome da tabela de combustíveis
                    key: 'id',
                },
            },
            renavan: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            origemId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Origem, // Nome da tabela de origens
                    key: 'id',
                },
            },
            transmissao: {
                type: sequelize_1.DataTypes.ENUM('Manual', 'Automático'),
                allowNull: false,
            },
            nPortas: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            precoCustom: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            precoVenda: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            custoFrete: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            inativo: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: "Modelo",
            freezeTableName: true
        });
    }
    // Define as associações entre os modelos
    static associate(models) {
        // Associação entre Modelo e Motor
        Modelo.belongsTo(models.Motor, { foreignKey: 'motorId' });
        // Associação entre Modelo e Combustivel
        Modelo.belongsTo(models.Combustivel, { foreignKey: 'combustivelId' });
        // Associação entre Modelo e Origem
        Modelo.belongsTo(models.Origem, { foreignKey: 'origemId' });
        // Associação entre Modelo e Veiculo
        Modelo.belongsTo(models.Veiculo, { foreignKey: 'veiculoId' });
    }
}
exports.Modelo = Modelo;
class PedidoFabrica extends sequelize_1.Model {
    static initialize(sequelize) {
        PedidoFabrica.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            numeroNota: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            modeloId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Modelo,
                    key: 'id'
                }
            },
            serieChassi: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('JORADO', 'FABRICA'),
                allowNull: false,
            },
            destino: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            empresaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa_1.Empresa,
                    key: 'id'
                }
            },
            observacao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            dataExpFabrica: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            dataExpJorado: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            valor: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "PedidoFabrica",
            freezeTableName: true
        });
    }
    // Define as associações entre os modelos
    static associate(models) {
        // Associação entre PedidoFabrica e Modelo
        PedidoFabrica.belongsTo(models.Modelo, { foreignKey: 'modeloId' });
        // Associação entre PedidoFabrica e Empresa
        PedidoFabrica.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
    }
}
exports.PedidoFabrica = PedidoFabrica;
// Função para inicializar todos os modelos
const VeiculoInit = (sequelize) => {
    Seguimento.initialize(sequelize);
    Marca.initialize(sequelize);
    Veiculo.initialize(sequelize);
    Veiculo.associate({ Marca, Seguimento });
    Motor.initialize(sequelize);
    Combustivel.initialize(sequelize);
    Origem.initialize(sequelize);
    Modelo.initialize(sequelize);
    Modelo.associate({ Motor, Combustivel, Origem, Veiculo });
    PedidoFabrica.initialize(sequelize);
    PedidoFabrica.associate({ Modelo, Empresa: Empresa_1.Empresa });
};
exports.VeiculoInit = VeiculoInit;
