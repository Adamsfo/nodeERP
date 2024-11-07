import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Usuario } from './Usuario';
import { Empresa } from './Empresa';
import { Ticket } from './Ticket';

interface CaixaAttributes {
    id: number;
    dataAbertura: Date;
    dataFechamento?: Date | null;
    saldoInicial: number;
    saldoFinal?: number | null;
    status: 'aberto' | 'fechado';
    usuarioId: number
    empresaId: number
}

interface CaixaCreationAttributes extends Optional<CaixaAttributes, 'id'> { }

class Caixa extends Model<CaixaAttributes, CaixaCreationAttributes> implements CaixaAttributes {
    public id!: number;
    public dataAbertura!: Date;
    public dataFechamento!: Date | null;
    public saldoInicial!: number;
    public saldoFinal!: number | null;
    public status!: 'aberto' | 'fechado';
    public usuarioId!: number;
    public empresaId!: number;

    static initialize(sequelize: Sequelize) {
        Caixa.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            dataAbertura: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            dataFechamento: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            saldoInicial: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            saldoFinal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('aberto', 'fechado'),
                allowNull: false,
            },
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Usuario',
                    key: 'id'
                },
            },
            empresaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Empresa',
                    key: 'id'
                },
            }
        }, {
            sequelize,
            modelName: "Caixa",
            freezeTableName: true,
            timestamps: true,
        });
    }

    static associate(models: any) {
        Caixa.hasMany(models.CaixaItem, { foreignKey: 'caixaId' });

        Caixa.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        Caixa.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
    }
}

interface CaixaItemAttributes {
    id: number;
    caixaId: number;
    tipo: 'entrada' | 'saida';
    descricao: string;
    valor: number;
    data: Date;
    pagamentoId?: number | null;  // Opcional para associar ao pagamento
}

interface CaixaItemCreationAttributes extends Optional<CaixaItemAttributes, 'id'> { }

class CaixaItem extends Model<CaixaItemAttributes, CaixaItemCreationAttributes> implements CaixaItemAttributes {
    public id!: number;
    public caixaId!: number;
    public tipo!: 'entrada' | 'saida';
    public descricao!: string;
    public valor!: number;
    public data!: Date;
    public pagamentoId!: number | null;

    static initialize(sequelize: Sequelize) {
        CaixaItem.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            caixaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Caixa',
                    key: 'id'
                },
            },
            tipo: {
                type: DataTypes.ENUM('entrada', 'saida'),
                allowNull: false,
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            valor: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            data: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            pagamentoId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Pagamento',
                    key: 'id'
                },
            }
        }, {
            sequelize,
            modelName: "CaixaItem",
            freezeTableName: true,
            timestamps: true,
        });
    }

    static associate(models: any) {
        CaixaItem.belongsTo(models.Pagamento, { foreignKey: 'pagamentoId' });
        CaixaItem.belongsTo(models.Caixa, { foreignKey: 'caixaId' });
    }
}

interface PagamentoAttributes {
    id: number;
    ticketId: number;
    valor: number;
    dataPagamento: Date;
    metodo: 'cartao' | 'boleto' | 'pix';
    caixaItemId?: number | null;  // Adicionado para vincular ao CaixaItem
    empresaId: number;
}

interface PagamentoCreationAttributes extends Optional<PagamentoAttributes, 'id'> { }

class Pagamento extends Model<PagamentoAttributes, PagamentoCreationAttributes> implements PagamentoAttributes {
    public id!: number;
    public ticketId!: number;
    public valor!: number;
    public dataPagamento!: Date;
    public metodo!: 'cartao' | 'boleto' | 'pix';
    public caixaItemId!: number | null;
    public empresaId!: number;

    static initialize(sequelize: Sequelize) {
        Pagamento.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            ticketId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Ticket',
                    key: 'id'
                },
            },
            valor: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            dataPagamento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            metodo: {
                type: DataTypes.ENUM('cartao', 'boleto', 'pix'),
                allowNull: false,
            },
            caixaItemId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'CaixaItem',
                    key: 'id'
                },
            },
            empresaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Empresa',
                    key: 'id'
                },
            }
        }, {
            sequelize,
            modelName: "Pagamento",
            freezeTableName: true,
            timestamps: true,
        });
    }

    static associate(models: any) {
        Pagamento.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
        Pagamento.belongsTo(models.CaixaItem, { foreignKey: 'caixaItemId' });
        Pagamento.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
    }
}

export const FinanceiroInit = (sequelize: Sequelize) => {
    Caixa.initialize(sequelize);
    CaixaItem.initialize(sequelize);
    Pagamento.initialize(sequelize);

    Caixa.associate({ CaixaItem, Usuario, Empresa });
    CaixaItem.associate({ Caixa, Pagamento });
    Pagamento.associate({ Ticket, CaixaItem, Empresa });
}

export {
    Caixa,
    CaixaItem,
    Pagamento
};