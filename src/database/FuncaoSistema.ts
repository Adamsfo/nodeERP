import { FuncaoSistema, FuncaoUsuario, FuncaoUsuarioAcesso } from '../models/Usuario'

module.exports = {
    funcaoSistema: async () => {

        await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Cadastro / Cliente"
            }
        })

        await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Cadastro / Fornecedor"
            }
        })

        await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Cadastro / Cidade"
            }
        })

        let funcaoSistema = await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Config. de Sistema / Função de Usuário"
            }
        })

        const funcaoUsuario = await FuncaoUsuario.findOrCreate({
            where: {
                funcaoUsuario: "Administrador"
            }
        })

        await FuncaoUsuarioAcesso.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })

        funcaoSistema = await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Config.de Sistema / Usuário do Sistema"
            }
        })

        await FuncaoUsuarioAcesso.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })

    }
}