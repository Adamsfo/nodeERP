import { FuncaoSistema, FuncaoUsuario, FuncaoUsuarioAcesso, Usuario, UsuarioFuncao } from '../models/Usuario'

module.exports = {
    configUsuario: async () => {
        const funcaoSistema = await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Configurações"
            }
        })

        const funcaoUsuario = await FuncaoUsuario.findOrCreate({
            where: {
                funcaoUsuario: "Administrador"
            }
        })

        const funcaoUsuarioAcesso = await FuncaoUsuarioAcesso.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })

        const usuario = await Usuario.findOrCreate({
            where : {
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
        })      

        const usuarioAcesso = await UsuarioFuncao.findOrCreate({
            where: {
                idUsuario: usuario[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })
    }
}