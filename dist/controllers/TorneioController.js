"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRegistros_1 = require("../utils/getRegistros");
const customError_1 = require("../utils/customError");
const EstruturaTorneio_1 = require("../models/EstruturaTorneio");
const Torneio_1 = require("../models/Torneio");
const TorneioService_1 = __importDefault(require("./TorneioService"));
module.exports = {
    async get(req, res, next) {
        await (0, getRegistros_1.getRegistros)(Torneio_1.Torneio, req, res, next, [
            {
                model: Torneio_1.TorneioBlindItem,
                as: 'blindItem',
            }
        ]);
    },
    async add(req, res, next) {
        try {
            const { descricao, blindId, empresaId, estruturaId, dataInicio } = req.body;
            console.log('entrou aquiiiiiiiiiiiii');
            // Validação básica
            if (!descricao || !blindId || !empresaId || !estruturaId) {
                throw new customError_1.CustomError('Faltando informações em campos obrigatórios.', 400, '');
            }
            const blinds = await EstruturaTorneio_1.BlindItem.findAll({
                where: { blindId },
                order: [['order', 'ASC']], // Ordenar pelo campo 'order' de forma crescente (ASC). Use 'DESC' para decrescente.
            });
            if (!blinds) {
                throw new customError_1.CustomError('Blinds não encontrados.', 404, '');
            }
            const registro = await Torneio_1.Torneio.create({
                ...req.body, status: 'Criado',
                tempoRestanteNivel: blinds[0].duracao * 60
            });
            const torneioBlindItems = blinds.map(blind => ({
                nivel: blind.nivel,
                smallBlind: blind.smallBlind,
                bigBlind: blind.bigBlind,
                duracao: blind.duracao,
                ante: blind.ante,
                order: blind.order,
                torneioId: registro.id,
                // Adicione outros campos conforme necessário
            }));
            await Torneio_1.TorneioBlindItem.bulkCreate(torneioBlindItems);
            const primeiroNivel = await Torneio_1.TorneioBlindItem.findOne({ where: { torneioId: registro.id }, order: [['order', 'ASC']] });
            if (primeiroNivel) {
                registro.blindItemAtual = primeiroNivel.id;
            }
            else {
                throw new customError_1.CustomError('Primeiro nível não encontrado.', 404, '');
            }
            registro.save();
            const estruturaItems = await EstruturaTorneio_1.EstruturaTorneioItem.findAll({ where: { estruturaId } });
            if (!estruturaItems) {
                throw new customError_1.CustomError('Estrutura de torneio não encontrada.', 404, '');
            }
            const toneioItems = estruturaItems.map(item => ({
                descricao: item.descricao,
                fichas: item.fichas,
                limiteJogador: item.limiteJogador,
                qtdePorJogador: item.qtdePorJogador,
                valorInscricao: item.valorInscricao,
                taxaAdm: item.taxaAdm,
                tipoRake: item.tipoRake,
                rake: item.rake,
                torneioId: registro.id,
                // Adicione outros campos conforme necessário
            }));
            console.log(toneioItems);
            await Torneio_1.TorneioItem.bulkCreate(toneioItems);
            return res.status(201).json(registro);
        }
        catch (error) {
            next(error);
        }
    },
    async edit(req, res, next) {
        try {
            const id = req.params.id;
            const registro = await Torneio_1.Torneio.findByPk(id);
            if (!registro) {
                throw new customError_1.CustomError('Registro não encontrado.', 404, '');
            }
            // Atualizar apenas os campos que estão definidos (não são undefined)
            Object.keys(req.body).forEach(field => {
                if (req.body[field] !== undefined && field in registro) {
                    registro[field] = req.body[field];
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
            const registro = await Torneio_1.Torneio.findByPk(id);
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
    },
    async iniciar(req, res, next) {
        try {
            const torneio = await TorneioService_1.default.iniciarTorneio((torneioAtualizado) => {
                require('./TorneioWebSocket').enviarAtualizacaoTorneio(torneioAtualizado);
            });
            res.json({ message: 'Torneio iniciado!', torneio });
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    },
    async parar(req, res, next) {
        try {
            const torneio = await TorneioService_1.default.pararTorneio();
            res.json({ message: 'Torneio parado!', torneio });
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    },
    async status(req, res, next) {
        try {
            const status = await TorneioService_1.default.buscarTorneioEmAndamentoOuParado();
            if (!status) {
                res.status(404).send('Nenhum torneio encontrado.');
            }
            else {
                res.json(status);
            }
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
