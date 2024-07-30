const { validationResult, matchedData } = require('express-validator')
const { Usuario } = require('../models/Usuario')
const dbConfig = require('../config/database')
const { Op, Sequelize } = require('sequelize')
const sequelize = new Sequelize(dbConfig)
const { getRegistros } = require("./utils")

module.exports = { 
    async getUsuarioT(req, res) {
        await getRegistros(Usuario, req, res)
    },

    // async getUsuario(req, res) {
    //     try {
    //         // Pegando os parâmetros de paginação, pesquisa, filtros e ordenação da query string
    //         const page = parseInt(req.query.page, 10) || 1;
    //         const pageSize = parseInt(req.query.pageSize, 10) || 10;
    //         const search = req.query.search || '';
    //         const order = req.query.order || 'asc';
    //         const sortBy = req.query.sortBy || 'id'; // Campo padrão para ordenação

    //         // Filtros adicionais (opcional, com base nos campos da sua tabela)
    //         const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

    //         // Calculando offset e limit
    //         const offset = (page - 1) * pageSize;
    //         const limit = pageSize;

    //         // Condição de pesquisa
    //         const searchCondition = search ? {
    //             [Op.or]: [
    //                 { field1: { [Op.like]: `%${search}%` } }, // Substitua pelos nomes dos campos da sua tabela
    //                 // { field2: { [Op.like]: `%${search}%` } },
    //                 // { field3: { [Op.like]: `%${search}%` } }
    //             ]
    //         } : {};

    //         // Condições de filtro adicionais
    //         const filterConditions = {};
    //         if (filters && typeof filters === 'object') {
    //         for (const [key, value] of Object.entries(filters)) {
    //             filterConditions[key] = { [Op.eq]: value };
    //         }
    //         }

    //         // Combinação de condições de pesquisa e filtro
    //         const whereCondition = {
    //             ...searchCondition,
    //             ...filterConditions
    //         };

    //         // Consultando o banco de dados com paginação, pesquisa, filtros e ordenação
    //         const { count, rows } = await Usuario.findAndCountAll({
    //             where: whereCondition,
    //             offset,
    //             limit,
    //             order: [[sortBy, order]] // Ordenação por campo e direção
    //         });

    //         // Calculando o número total de páginas
    //         const totalPages = Math.ceil(count / pageSize);            

    //         // Retornando a resposta com dados e metadados de paginação
    //         res.status(200).json({
    //             data: rows,
    //             meta: {
    //                 totalItems: count,
    //                 totalPages,
    //                 currentPage: page,
    //                 pageSize
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Erro ao buscar os itens:', error);
    //         res.status(500).json({ error: 'Erro ao buscar registros' });
    //     }
    // },

    async store(req, res) {
        const { nome, nomecompleto, senha } = req.body
        const user = await Usuario.create({ nome, nomecompleto, senha })
        return res.json(user)
    },

    async editAction(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return
        }
        const data = req.body
        const user = await Usuario.findOne({ where: { codigo: data.codigo } })

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

        return res.json({ user })
    }
}