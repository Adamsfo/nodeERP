const { validationResult, matchedData } = require('express-validator')
const { STRING } = require('sequelize')
const bcrypt = require('bcrypt')
const Senha = require('../models/Senha')
const UsuarioController = require('./UsuarioController')

module.exports = {
    login: async (req, res) => {
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        //Validando email
        const user = await Senha.findAll({where: {"nome": data.nome}})
        if (!user[0]) {
            res.json({error: "E-mail e/ou senha errados!"})            
            return
        }                   
        
        if(data.senha !== user[0].senha) {
            res.json({error: "E-mail e/ou senha errados!"})            
            return
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)
        console.log(token)

        user[0].token = token
        await user[0].save()
        res.json({user})
    },

    cadastroLogin: async (req, res) => {
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        const user = await Senha.findAll({where: {"nome": data.nome}})
        
        if (user[0]) {
            res.json({
                error: {nome:{msg:'Usuário ja cadastrado'}}
            })
            return
        } else {
            const payload = (Date.now() + Math.random()).toString()
            const token = await bcrypt.hash(payload, 10)
            const user = await Senha.create({nome: data.nome, nomecompleto: data.nomecompleto, senha: data.senha, token: token})            
            return res.json(user)  
        }            
    },
}