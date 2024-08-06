"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioFuncao = exports.Usuario = exports.FuncaoUsuarioAcesso = exports.FuncaoUsuario = exports.FuncaoSistema = exports.UsuarioInit = void 0;
const sequelize_1 = require("sequelize");
const bcrypt = require('bcrypt');
class FuncaoSistema extends sequelize_1.Model {
    static initialize(sequelize) {
        FuncaoSistema.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoSistema: {
                type: sequelize_1.DataTypes.STRING,
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
exports.FuncaoSistema = FuncaoSistema;
class FuncaoUsuario extends sequelize_1.Model {
    static initialize(sequelize) {
        FuncaoUsuario.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            funcaoUsuario: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: "FuncaoUsuario",
            freezeTableName: true
        });
    }
}
exports.FuncaoUsuario = FuncaoUsuario;
class FuncaoUsuarioAcesso extends sequelize_1.Model {
    static initialize(sequelize) {
        FuncaoUsuarioAcesso.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idFuncaoSistema: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: FuncaoSistema,
                    key: 'id'
                }
            },
            idFuncaoUsuario: {
                type: sequelize_1.DataTypes.INTEGER,
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
exports.FuncaoUsuarioAcesso = FuncaoUsuarioAcesso;
class Usuario extends sequelize_1.Model {
    static initialize(sequelize) {
        Usuario.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            login: {
                type: sequelize_1.DataTypes.STRING,
                unique: true
            },
            senha: sequelize_1.DataTypes.STRING,
            nomeCompleto: sequelize_1.DataTypes.STRING,
            ativo: sequelize_1.DataTypes.BOOLEAN,
            alterarSenha: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
            token: sequelize_1.DataTypes.STRING
        }, {
            sequelize,
            modelName: "Usuario",
            freezeTableName: true,
            hooks: {
                beforeSave: async (usuario) => {
                    if (usuario.senha) {
                        usuario.senha = await bcrypt.hash(usuario.senha, 10);
                    }
                }
            }
        });
    }
    // Método para verificar senha
    async verifyPassword(senha) {
        return bcrypt.compare(senha, this.senha || '');
    }
}
exports.Usuario = Usuario;
class UsuarioFuncao extends sequelize_1.Model {
    static initialize(sequelize) {
        UsuarioFuncao.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            idUsuario: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: Usuario,
                    key: 'id'
                }
            },
            idFuncaoUsuario: {
                type: sequelize_1.DataTypes.INTEGER,
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
}
exports.UsuarioFuncao = UsuarioFuncao;
// Função para inicializar todos os modelos
const UsuarioInit = (sequelize) => {
    FuncaoSistema.initialize(sequelize);
    FuncaoUsuario.initialize(sequelize);
    FuncaoUsuarioAcesso.initialize(sequelize);
    Usuario.initialize(sequelize);
    UsuarioFuncao.initialize(sequelize);
};
exports.UsuarioInit = UsuarioInit;
