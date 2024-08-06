"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator');
const Usuario_1 = require("../models/Usuario");
const getRegistros_1 = require("../utils/getRegistros");
const CustomError = require('../utils/customError');
module.exports = {
    async getUsuario(req, res, next) {
        await (0, getRegistros_1.getRegistros)(Usuario_1.Usuario, req, res, next);
    },
    async addUsuario(req, res, next) {
        try {
            const { email, login, senha, nomeCompleto } = req.body;
            // Validação básica
            if (!email || !login || !senha || !nomeCompleto) {
                // return res.status(400).json({ message: 'Os campos email, login, senha, nomeCompleto são obrigatórios.' });
                throw new CustomError('Os campos email, login, senha, nomeCompleto são obrigatórios.', 400, '');
            }
            const ativo = true;
            const alterarSenha = true;
            const registro = await Usuario_1.Usuario.create({ email, login, senha, nomeCompleto, ativo, alterarSenha });
            return res.status(201).json(registro);
        }
        catch (error) {
            next(error);
        }
    },
    async editUsuario(req, res, next) {
        try {
            const id = req.params.id;
            const { email, login, senha, nomeCompleto, ativo, alterarSenha } = req.body;
            // Validação dos dados (exemplo simples)
            if (!id) {
                throw new CustomError('ID do usuário é obrigatório.', 400, '');
            }
            if (!email && !login && !senha && !nomeCompleto && ativo === undefined && alterarSenha === undefined) {
                // return res.status(400).json({ message: 'Nenhum campo para atualizar fornecido.' });
                throw new CustomError('Nenhum campo para atualizar fornecido.', 400, '');
            }
            // Verificar se o usuário existe
            const registro = await Usuario_1.Usuario.findByPk(id);
            if (!registro) {
                throw new CustomError('Usuário não encontrado.', 404, '');
                // return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            // Atualizar os campos permitidos
            if (email)
                registro.email = email;
            if (login)
                registro.login = login;
            if (senha)
                registro.senha = senha;
            if (nomeCompleto)
                registro.nomeCompleto = nomeCompleto;
            if (ativo !== undefined)
                registro.ativo = ativo;
            if (alterarSenha !== undefined)
                registro.alterarSenha = alterarSenha;
            await registro.save();
            return res.status(200).json(registro);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    },
    async deleteUsuario(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new CustomError('ID do usuário é obrigatório.', 400, '');
                // return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
            }
            // Verificar se o usuário existe
            const registro = await Usuario_1.Usuario.findByPk(id);
            if (!registro) {
                throw new CustomError('Usuário não encontrado.', 404, '');
                // return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            // Deletar o usuário
            await registro.destroy();
            return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
};
