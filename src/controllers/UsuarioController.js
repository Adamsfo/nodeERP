const { validationResult, matchedData } = require('express-validator')
const Usuario = require('../models/Usuario')

module.exports = {
    async index(rew, res) {
        const users = await Senha.findAll()

        return res.json(users)
    },

    async store(req, res) {        
        const { nome, nomecompleto, senha} = req.body        
        const user = await Usuario.create({nome, nomecompleto, senha})
        return res.json(user)
    },

    async editAction(req, res) {
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            res.json({error: errors.mapped()})
            return
        }
        const data = req.body        
        const user = await Usuario.findOne({where: {codigo: data.codigo}})

        if (data.nomecompleto) {
            user.nomecompleto = data.nomecompleto
        }

        if (data.nome) {
            user.nome = data.nome
        }

        if (data.senha) {
            user.senha = data.senha
        }

        user.save()

        return res.json({user})
    }
}