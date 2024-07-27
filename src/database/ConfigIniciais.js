const AcessoFuncao = require("../models/AcessoFuncao")
const FuncaoSistema = require("../models/FuncaoSistema")
const FuncaoUsuario = require("../models/FuncaoUsuario")


module.exports = {
    init: async () => {
        const funcaoSistema = await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Configurações"
            },
            defaults: {
                funcaoSistema: "Configurações"
            }
        })

        const funcaoUsuario = await FuncaoUsuario.findOrCreate({
            where: {
                funcaoUsuario: "Administrador"
            },
            defaults: {
                funcaoUsuario: "Administrador"
            }
        })

        console.log(funcaoUsuario[0].id)
        console.log(funcaoSistema[0].id)

        await AcessoFuncao.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            },
            defaults: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })
    }
}