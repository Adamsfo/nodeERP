const { Op } = require('sequelize');

async function getRegistros(Model, req, res) {
  try {
    // Pegando os parâmetros de paginação, pesquisa, filtros e ordenação da query string
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const search = req.query.search || '';
    const order = req.query.order || 'asc';
    const sortBy = req.query.sortBy || 'id'; // Campo padrão para ordenação

    // Filtros adicionais (opcional)
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

    // Calculando offset e limit
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Condição de pesquisa
    const searchCondition = search ? {
      [Op.or]: Object.keys(Model.rawAttributes).map(field => ({
        [field]: { [Op.like]: `%${search}%` }
      }))
    } : {};

    // Condições de filtro adicionais
    const filterConditions = {};
    if (filters && typeof filters === 'object') {
      for (const [key, value] of Object.entries(filters)) {
        filterConditions[key] = { [Op.like]: `%${value}%` };
      }
    }

    console.log(filterConditions)

    // Combinação de condições de pesquisa e filtro
    const whereCondition = {
      ...searchCondition,
      ...filterConditions
    };

    // Consultando o banco de dados com paginação, pesquisa, filtros e ordenação
    const { count, rows } = await Model.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order: [[sortBy, order]] // Ordenação por campo e direção
    });

    // Calculando o número total de páginas
    const totalPages = Math.ceil(count / pageSize);

    // Retornando a resposta com dados e metadados de paginação
    res.status(200).json({
      data: rows,
      meta: {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize
      }
    });
  } catch (error) {
    console.error('Erro ao buscar os itens:', error);
    res.status(500).json({ error: 'Erro ao buscar registros' });
  }
}

module.exports = {
    getRegistros
};
