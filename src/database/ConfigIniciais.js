const FuncaoSistema = require("../models/FuncaoSistema")
const FuncaoUsuario = require("../models/FuncaoUsuario")


module.exports = {
    init: async () => {
        const funcaosistema = await FuncaoSistema.findOne({
            where: {
                funcaoSistema: "Configurações"
            }
        })

        if (!funcaosistema) {
            FuncaoSistema.create({funcaoSistema: "Configurações"})
        }

        let funcaoUsuario = await FuncaoUsuario.findOne({
            where: {
                funcaoUsuario: "Administrador"
            }
        })

        if (!funcaoUsuario) {
            funcaoUsuario = await FuncaoUsuario.create({funcaoUsuario: "Administrador"}) 
        }

    }
}