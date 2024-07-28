const { Model, DataTypes } = require('sequelize');

const UsuarioInit = (connection) => {
    FuncaoSistema.init(connection);
    FuncaoUsuario.init(connection);
    FuncaoUsuarioAcesso.init(connection);
    Usuario.init(connection);
    UsuarioFuncao.init(connection);
}

class FuncaoSistema extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoSistema: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            modelName: "FuncaoSistema",
            freezeTableName: true
        })
    }
}

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

class FuncaoUsuarioAcesso extends Model {
    static init(sequelize) {
        super.init({
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
            },
        }, {
            sequelize,
            modelName: "FuncaoUsuarioAcesso",
            freezeTableName: true
        })
    }
}

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: DataTypes.STRING,
            login: {
                type: DataTypes.STRING,
                unique: true,
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
            freezeTableName: true
        })
    }
}

class UsuarioFuncao extends Model {
    static init(sequelize) {
        super.init({
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
            },
        }, {
            sequelize,
            modelName: "UsuarioFuncao",
            freezeTableName: true
        })
    }
}

module.exports = { FuncaoSistema, FuncaoUsuario, FuncaoUsuarioAcesso, Usuario, UsuarioFuncao, UsuarioInit };