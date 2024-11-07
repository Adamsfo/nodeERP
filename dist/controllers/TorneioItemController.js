"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRegistros_1 = require("../utils/getRegistros");
const customError_1 = require("../utils/customError");
const Torneio_1 = require("../models/Torneio");

module.exports = {
    async get(req, res, next) {
        await (0, getRegistros_1.getRegistros)(Torneio_1.TorneioItem, req, res, next);
    },

    async add(req, res, next) {
        try {
            const { fichas, valorInscricao, estruturaId } = req.body;
            if (!fichas || !valorInscricao || !estruturaId) {
                throw new customError_1.CustomError('Faltando informações em campos obrigatórios.', 400, '');
            }
            const attributes = Torneio_1.TorneioItem.getAttributes();
            console.log(attributes);
            Object.keys(req.body).forEach(field => {
                if (req.body[field] !== undefined) {
                    if (attributes[field].type.key === 'DECIMAL' && !req.body[field].toString().includes('.')) {
                        (req.body)[field] = req.body[field] / 100;
                    }
                    else {
                        (req.body)[field] = req.body[field];
                    }
                }
            });
            const registro = await Torneio_1.TorneioItem.create(req.body);
            console.log(registro);
            return res.status(201).json(registro);
        }
        catch (error) {
            next(error);
        }
    },

    async edit(req, res, next) {
        try {
            const id = req.params.id;
            const registro = await Torneio_1.TorneioItem.findByPk(id);
            if (!registro) {
                throw new customError_1.CustomError('Registro não encontrado.', 404, '');
            }
            const attributes = Torneio_1.TorneioItem.getAttributes();
            console.log(attributes);
            // Atualizar apenas os campos que estão definidos (não são undefined)
            Object.keys(req.body).forEach(field => {
                if (req.body[field] !== undefined && field in registro) {
                    if (attributes[field].type.key === 'DECIMAL' && attributes[field].type._scale == 2 && !req.body[field].toString().includes('.')) {
                        registro[field] = req.body[field] / 100;
                    }
                    else {
                        registro[field] = req.body[field];
                    }
                }
            });
            await registro.save();
            return res.status(200).json(registro);
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    },

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new customError_1.CustomError('ID do registro é obrigatório.', 400, '');
            }
            // Verificar se o usuário existe
            const registro = await Torneio_1.TorneioItem.findByPk(id);
            if (!registro) {
                throw new customError_1.CustomError('Registro não encontrado.', 404, '');
                // return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            // Deletar o usuário
            await registro.destroy();
            return res.status(200).json({ message: 'Registro deletado com sucesso.' });
        }
        catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
};
