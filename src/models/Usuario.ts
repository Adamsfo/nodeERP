import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
const bcrypt = require('bcrypt');

// Definindo interfaces para atributos e criação de modelos
interface FuncaoSistemaAttributes {
    id: number;
    funcaoSistema: string;
}

interface FuncaoSistemaCreationAttributes extends Optional<FuncaoSistemaAttributes, 'id'> {}

class FuncaoSistema extends Model<FuncaoSistemaAttributes, FuncaoSistemaCreationAttributes> implements FuncaoSistemaAttributes {
    public id!: number;
    public funcaoSistema!: string;

    static initialize(sequelize: Sequelize) {
        FuncaoSistema.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoSistema: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: "FuncaoSistema",
            freezeTableName: true
        });
    }
}

interface FuncaoUsuarioAttributes {
    id: number;
    funcaoUsuario: string;
}

interface FuncaoUsuarioCreationAttributes extends Optional<FuncaoUsuarioAttributes, 'id'> {}

class FuncaoUsuario extends Model<FuncaoUsuarioAttributes, FuncaoUsuarioCreationAttributes> implements FuncaoUsuarioAttributes {
    public id!: number;
    public funcaoUsuario!: string;

    static initialize(sequelize: Sequelize) {
        FuncaoUsuario.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoUsuario: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: "FuncaoUsuario",
            freezeTableName: true
        });
    }

    static associate(models: any) {
        FuncaoUsuario.hasMany(models.UsuarioFuncao, {
            foreignKey: 'idFuncaoUsuario',
            as: 'usuarios'
        });
    }
}

interface FuncaoUsuarioAcessoAttributes {
    id: number;
    idFuncaoSistema: number;
    idFuncaoUsuario: number;
}

interface FuncaoUsuarioAcessoCreationAttributes extends Optional<FuncaoUsuarioAcessoAttributes, 'id'> {}

class FuncaoUsuarioAcesso extends Model<FuncaoUsuarioAcessoAttributes, FuncaoUsuarioAcessoCreationAttributes> implements FuncaoUsuarioAcessoAttributes {
    public id!: number;
    public idFuncaoSistema!: number;
    public idFuncaoUsuario!: number;

    static initialize(sequelize: Sequelize) {
        FuncaoUsuarioAcesso.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idFuncaoSistema: {
                type: DataTypes.INTEGER,
                references: {
                    model: FuncaoSistema,
                    key: 'id'
                }
            },
            idFuncaoUsuario: {
                type: DataTypes.INTEGER,
                references: {
                    model: FuncaoUsuario,
                    key: 'id'
                }
            }
        }, {
            sequelize,
            modelName: "FuncaoUsuarioAcesso",
            freezeTableName: true
        });
    }
}

interface UsuarioAttributes {
    id: number;
    email: string;
    login: string;
    senha?: string;
    nomeCompleto?: string;
    ativo?: boolean;
    alterarSenha?: boolean;
    token?: string;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'senha'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    public id!: number;
    public email!: string;
    public login!: string;
    public senha?: string;
    public nomeCompleto?: string;
    public ativo?: boolean;
    public alterarSenha?: boolean;
    public token?: string;

    static initialize(sequelize: Sequelize) {
        Usuario.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            login: {
                type: DataTypes.STRING,
                unique: true
            },
            senha: DataTypes.STRING,
            nomeCompleto: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
            alterarSenha: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            token: DataTypes.STRING
        }, {
            sequelize,
            modelName: "Usuario",
            freezeTableName: true,
            hooks: {
                beforeSave: async (usuario: Usuario) => {
                    if (usuario.senha) {
                        usuario.senha = await bcrypt.hash(usuario.senha, 10);
                    }
                }
            }
        });        
    }

    static associate(models: any) {
        Usuario.hasMany(models.UsuarioFuncao, {
            foreignKey: 'idUsuario',
            as: 'funcoes'
        });
    }

    // Método para verificar senha
    public async verifyPassword(senha: string): Promise<boolean> {
        return bcrypt.compare(senha, this.senha || '');
    }
}

interface UsuarioFuncaoAttributes {
    id: number;
    idUsuario: number;
    idFuncaoUsuario: number;
}

interface UsuarioFuncaoCreationAttributes extends Optional<UsuarioFuncaoAttributes, 'id'> {}

class UsuarioFuncao extends Model<UsuarioFuncaoAttributes, UsuarioFuncaoCreationAttributes> implements UsuarioFuncaoAttributes {
    public id!: number;
    public idUsuario!: number;
    public idFuncaoUsuario!: number;

    static initialize(sequelize: Sequelize) {
        UsuarioFuncao.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idUsuario: {
                type: DataTypes.INTEGER,
                references: {
                    model: Usuario,
                    key: 'id'
                }
            },
            idFuncaoUsuario: {
                type: DataTypes.INTEGER,
                references: {
                    model: FuncaoUsuario,
                    key: 'id'
                }
            }
        }, {
            sequelize,
            modelName: "UsuarioFuncao",
            freezeTableName: true
        });
    }   
    
    static associate(models: any) {
        UsuarioFuncao.belongsTo(models.Usuario, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
        UsuarioFuncao.belongsTo(models.FuncaoUsuario, {
            foreignKey: 'idFuncaoUsuario',
            as: 'funcaoUsuario'
        });
    }
}

// Função para inicializar todos os modelos
export const UsuarioInit = (sequelize: Sequelize) => {
    FuncaoSistema.initialize(sequelize);
    FuncaoUsuario.initialize(sequelize);
    FuncaoUsuarioAcesso.initialize(sequelize);
    Usuario.initialize(sequelize);
    UsuarioFuncao.initialize(sequelize);
    Usuario.associate({ UsuarioFuncao });
    FuncaoUsuario.associate({ UsuarioFuncao });
    UsuarioFuncao.associate({ Usuario, FuncaoUsuario });
}

export {
    FuncaoSistema,
    FuncaoUsuario,
    FuncaoUsuarioAcesso,
    Usuario,
    UsuarioFuncao
};
