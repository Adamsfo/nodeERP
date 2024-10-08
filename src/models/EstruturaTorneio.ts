import { DataTypes, INTEGER, Model, Optional, Sequelize } from 'sequelize';
import { Empresa } from './Empresa';

// Definição dos atributos da entidade EstruturaTorneio
interface EstruturaTorneioAttributes {
    id: number;
    descricao: string;
    fichas: number;
    limiteJogadores: boolean;
    qtdeJogadores: number;
    valorInscricao: number;
    taxaAdm: number;
    rake: number;
    blindId?: number; // Chave estrangeira para associar com Blind
    empresaId: number;
}

// Define os atributos necessários para a criação de um novo registro,
// exceto o campo 'id', que é opcional
interface EstruturaTorneioCreationAttributes extends Optional<EstruturaTorneioAttributes, 'id'> { }

// Definição da classe EstruturaTorneio que estende a Model do Sequelize
class EstruturaTorneio extends Model<EstruturaTorneioAttributes, EstruturaTorneioCreationAttributes> implements EstruturaTorneioAttributes {
    public id!: number;
    public descricao!: string;
    public fichas!: number;
    public limiteJogadores!: boolean;
    public qtdeJogadores!: number;
    public valorInscricao!: number;
    public taxaAdm!: number;
    public rake!: number;
    public blindId?: number; // Campo para associar com Blind
    public empresaId!: number;

    // Inicialização do modelo com Sequelize
    static initialize(sequelize: Sequelize) {
        EstruturaTorneio.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fichas: {
                type: DataTypes.DECIMAL(10, 3),
                allowNull: false,
            },
            limiteJogadores: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            qtdeJogadores: {
                type: INTEGER,
                allowNull: true, // Se necessário, pode definir como obrigatório ou opcional
            },
            valorInscricao: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            taxaAdm: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            rake: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            blindId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'blind', // Nome da tabela Blind
                    key: 'id'
                },
                allowNull: true,
            },
            empresaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa,
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

    public static associate(models: any) {
        // Associação com a tabela Blind
        EstruturaTorneio.belongsTo(models.Blind, { foreignKey: 'blindId', as: 'blind' });

        // Associação com a tabela Empresa
        EstruturaTorneio.belongsTo(models.Empresa, { foreignKey: 'empresaId', as: 'empresa' });
    }


}

// Definição dos atributos da entidade Blind
interface BlindAttributes {
    id: number;
    descricao: string; // Descrição geral dos blinds
    empresaId: number;
}

// Define os atributos necessários para a criação de um novo registro,
// exceto o campo 'id', que é opcional
interface BlindCreationAttributes extends Optional<BlindAttributes, 'id'> { }

// Definição da classe Blind que estende a Model do Sequelize
class Blind extends Model<BlindAttributes, BlindCreationAttributes> implements BlindAttributes {
    public id!: number;
    public descricao!: string;
    public empresaId!: number;

    // Inicialização do modelo com Sequelize
    static initialize(sequelize: Sequelize) {
        Blind.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            empresaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Empresa,
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
    public static associate(models: any) {
        // Relacionamento 1:N com BlindItem
        Blind.hasMany(models.BlindItem, {
            foreignKey: 'blindId',
            as: 'blindItems',  // Alias para acessar os itens
        });

        // Relacionamento N:1 com Empresa
        Blind.belongsTo(models.Empresa, {
            foreignKey: 'empresaId',
            as: 'empresa',  // Alias para acessar a empresa
        });
    }
}

// Definição dos atributos da entidade BlindItem
interface BlindItemAttributes {
    id: number;
    nivel: number;            // Nível dos blinds (1, 2, 3, etc.)
    smallBlind: number;       // Valor do Small Blind
    bigBlind: number;         // Valor do Big Blind
    ante: number;             // Valor do Ante (se houver)
    duracao: number;          // Duração em minutos de cada nível
    blindId: number;          // Chave estrangeira para associar com Blind
}

// Define os atributos necessários para a criação de um novo registro,
// exceto o campo 'id', que é opcional
interface BlindItemCreationAttributes extends Optional<BlindItemAttributes, 'id'> { }

// Definição da classe BlindItem que estende a Model do Sequelize
class BlindItem extends Model<BlindItemAttributes, BlindItemCreationAttributes> implements BlindItemAttributes {
    public id!: number;
    public nivel!: number;
    public smallBlind!: number;
    public bigBlind!: number;
    public ante!: number;
    public duracao!: number;
    public blindId!: number; // Associação com Blind

    // Inicialização do modelo com Sequelize
    static initialize(sequelize: Sequelize) {
        BlindItem.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nivel: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            smallBlind: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bigBlind: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ante: {
                type: DataTypes.INTEGER,
                allowNull: true, // Ante é opcional, depende das regras do torneio
            },
            duracao: {
                type: DataTypes.INTEGER,
                allowNull: false, // Duração dos níveis de blind (em minutos)
            },
            blindId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'blind', // Nome da tabela Blind
                    key: 'id'
                },
                allowNull: false, // Associação obrigatória
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

// Função para inicializar os modelos
export const EstruturaTorneioInit = (sequelize: Sequelize) => {
    EstruturaTorneio.initialize(sequelize);
    Blind.initialize(sequelize);
    BlindItem.initialize(sequelize);

    // Associar os modelos após a inicialização
    EstruturaTorneio.associate({ Blind, Empresa });
    Blind.associate({ BlindItem, Empresa });
    BlindItem.associate();
}

export {
    EstruturaTorneio,
    Blind,
    BlindItem,
};
