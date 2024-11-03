"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorneioBlindItem = exports.TorneioItem = exports.Torneio = exports.TorneioInit = void 0;
const sequelize_1 = require("sequelize");
const Empresa_1 = require("./Empresa");
const EstruturaTorneio_1 = require("./EstruturaTorneio");
// Definição da classe EstruturaTorneio que estende a Model do Sequelize
class Torneio extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        Torneio.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            blindId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'blind', // Nome da tabela Blind
                    key: 'id'
                },
                allowNull: true,
            },
            empresaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa_1.Empresa,
                    key: 'id'
                }
            },
            estruturaId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'estruturaTorneio', // Nome da tabela EstruturaTorneio
                    key: 'id'
                },
            },
            dataInicio: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('Criado', 'parado', 'em andamento', 'finalizado'),
                allowNull: true,
            },
            blindItemAtual: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'torneioBlindItem',
                    key: 'id'
                },
            },
            tempoRestanteNivel: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: "torneio",
            freezeTableName: true,
            timestamps: false,
        });
    }
    static associate(models) {
        // Associação com a tabela Empresa
        Torneio.belongsTo(models.Empresa, { foreignKey: 'empresaId', as: 'empresa' });
        // Associação com a tabela EstruturaTorneio
        Torneio.belongsTo(models.EstruturaTorneio, { foreignKey: 'estruturaId', as: 'estruturaTorneio' });
        Torneio.belongsTo(models.TorneioBlindItem, { foreignKey: 'blindItemAtual', as: 'blindItem' });
    }
}
exports.Torneio = Torneio;
// Definição da classe EstruturaTorneio que estende a Model do Sequelize
class TorneioItem extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        TorneioItem.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            fichas: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false,
            },
            limiteJogador: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            qtdePorJogador: {
                type: sequelize_1.INTEGER,
                allowNull: true, // Se necessário, pode definir como obrigatório ou opcional
            },
            valorInscricao: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            taxaAdm: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            tipoRake: {
                type: sequelize_1.DataTypes.ENUM('%', 'R$'),
                allowNull: true,
            },
            rake: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            torneioId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'torneio', // Nome da tabela Torneio
                    key: 'id'
                },
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: "torneioItem",
            freezeTableName: true,
            timestamps: false,
        });
    }
    static associate(models) {
        // Associação com a tabela Blind
        TorneioItem.belongsTo(models.Torneio, { foreignKey: 'torneioId', as: 'torneio' });
    }
}
exports.TorneioItem = TorneioItem;
// Definição da classe BlindItem que estende a Model do Sequelize
class TorneioBlindItem extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        TorneioBlindItem.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nivel: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            smallBlind: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            bigBlind: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            ante: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true, // Ante é opcional, depende das regras do torneio
            },
            duracao: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false, // Duração dos níveis de blind (em minutos)
            },
            order: {
                type: sequelize_1.DataTypes.DECIMAL(5, 2),
                allowNull: true, // Ordem dos itens de blind
            },
            torneioId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'torneio', // Nome da tabela Torneio
                    key: 'id'
                },
                allowNull: false, // Associação obrigatória
            }
        }, {
            sequelize,
            modelName: "torneioBlindItem",
            freezeTableName: true,
            timestamps: false,
        });
    }
    // Definindo o relacionamento
    static associate(models) {
        // Associação com a tabela Blind
        TorneioBlindItem.belongsTo(models.Torneio, { foreignKey: 'torneioId', as: 'torneio' });
    }
}
exports.TorneioBlindItem = TorneioBlindItem;
// Função para inicializar os modelos
const TorneioInit = (sequelize) => {
    Torneio.initialize(sequelize);
    TorneioItem.initialize(sequelize);
    TorneioBlindItem.initialize(sequelize);
    // Associar os modelos após a inicialização
    Torneio.associate({ Empresa: Empresa_1.Empresa, EstruturaTorneio: EstruturaTorneio_1.EstruturaTorneio, TorneioBlindItem });
    TorneioItem.associate({ Torneio });
    TorneioBlindItem.associate({ Torneio });
};
exports.TorneioInit = TorneioInit;
