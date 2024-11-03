"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindItem = exports.Blind = exports.EstruturaTorneioItem = exports.EstruturaTorneio = exports.EstruturaTorneioInit = void 0;
const sequelize_1 = require("sequelize");
const Empresa_1 = require("./Empresa");
// Definição da classe EstruturaTorneio que estende a Model do Sequelize
class EstruturaTorneio extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        EstruturaTorneio.init({
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
            }
        }, {
            sequelize,
            modelName: "estruturaTorneio",
            freezeTableName: true,
            timestamps: false,
        });
    }
    static associate(models) {
        // Associação com a tabela Blind
        EstruturaTorneio.belongsTo(models.Blind, { foreignKey: 'blindId', as: 'blind' });
        // Associação com a tabela Empresa
        EstruturaTorneio.belongsTo(models.Empresa, { foreignKey: 'empresaId', as: 'empresa' });
    }
}
exports.EstruturaTorneio = EstruturaTorneio;
// Definição da classe EstruturaTorneio que estende a Model do Sequelize
class EstruturaTorneioItem extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        EstruturaTorneioItem.init({
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
            estruturaId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'estruturaTorneio', // Nome da tabela Blind
                    key: 'id'
                },
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "estruturaTorneioItem",
            freezeTableName: true,
            timestamps: false,
        });
    }
    static associate(models) {
        // Associação com a tabela Blind
        EstruturaTorneioItem.belongsTo(models.EstruturaTorneio, { foreignKey: 'estruturaId', as: 'estruturaTorneio' });
    }
}
exports.EstruturaTorneioItem = EstruturaTorneioItem;
// Definição da classe Blind que estende a Model do Sequelize
class Blind extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        Blind.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
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
            modelName: "blind",
            freezeTableName: true,
            timestamps: false,
        });
    }
    // Definindo os relacionamentos no método associate
    static associate(models) {
        // Relacionamento 1:N com BlindItem
        Blind.hasMany(models.BlindItem, {
            foreignKey: 'blindId',
            as: 'blindItems', // Alias para acessar os itens
        });
        // Relacionamento N:1 com Empresa
        Blind.belongsTo(models.Empresa, {
            foreignKey: 'empresaId',
            as: 'empresa', // Alias para acessar a empresa
        });
    }
}
exports.Blind = Blind;
// Definição da classe BlindItem que estende a Model do Sequelize
class BlindItem extends sequelize_1.Model {
    // Inicialização do modelo com Sequelize
    static initialize(sequelize) {
        BlindItem.init({
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
            blindId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'blind', // Nome da tabela Blind
                    key: 'id'
                },
                allowNull: false, // Associação obrigatória
            },
            order: {
                type: sequelize_1.DataTypes.DECIMAL(5, 2),
                allowNull: true, // Ordem dos itens de blind
            }
        }, {
            sequelize,
            modelName: "blindItem",
            freezeTableName: true,
            timestamps: false,
        });
    }
    // Definindo o relacionamento
    static associate() {
        BlindItem.belongsTo(Blind, { foreignKey: 'blindId', as: 'blind' });
    }
}
exports.BlindItem = BlindItem;
// Função para inicializar os modelos
const EstruturaTorneioInit = (sequelize) => {
    EstruturaTorneio.initialize(sequelize);
    EstruturaTorneioItem.initialize(sequelize);
    Blind.initialize(sequelize);
    BlindItem.initialize(sequelize);
    // Associar os modelos após a inicialização
    EstruturaTorneio.associate({ Blind, Empresa: Empresa_1.Empresa });
    EstruturaTorneioItem.associate({ EstruturaTorneio });
    Blind.associate({ BlindItem, Empresa: Empresa_1.Empresa });
    BlindItem.associate();
};
exports.EstruturaTorneioInit = EstruturaTorneioInit;
