"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../models/Usuario");
module.exports = {
    configUsuario: async () => {
        const funcaoSistema = await Usuario_1.FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Configurações"
            }
        });
        const funcaoUsuario = await Usuario_1.FuncaoUsuario.findOrCreate({
            where: {
                funcaoUsuario: "Administrador"
            }
        });
        const funcaoUsuarioAcesso = await Usuario_1.FuncaoUsuarioAcesso.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        });
        const usuario = await Usuario_1.Usuario.findOrCreate({
            where: {
                login: "Admin",
                email: "admin@tanztecnologia.com.br",
            },
            defaults: {
                login: "Admin",
                email: "admin@tanztecnologia.com.br",
                senha: "123456",
                ativo: true,
                alterarSenha: false,
                nomeCompleto: "Administrador Tanz"
            }
        });
        const usuarioAcesso = await Usuario_1.UsuarioFuncao.findOrCreate({
            where: {
                idUsuario: usuario[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        });
    }
};
