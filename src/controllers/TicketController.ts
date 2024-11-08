import { getRegistros } from "../utils/getRegistros"
import { CustomError } from '../utils/customError'
import { Ticket, TicketHistorico } from "../models/Ticket";
import { Torneio, TorneioItem } from "../models/Torneio";
import { Usuario } from "../models/Usuario";
import { ClienteFornecedor } from "../models/ClienteFornecedor";

module.exports = {
    async get(req: any, res: any, next: any) {
        await getRegistros(Ticket, req, res, next, [
            {
                model: ClienteFornecedor,
                as: 'ClienteFornecedor',
                attributes: ['razaoSocialNome'],
            },
            {
                model: Torneio,
                as: 'torneio',
                attributes: ['descricao'],
            },
            {
                model: TorneioItem,
                as: 'torneioItem',
                attributes: ['descricao'],
            }
        ]);
    },

    async getHistorico(req: any, res: any, next: any) {
        await getRegistros(TicketHistorico, req, res, next);
    },

    async add(req: any, res: any, next: any) {
        try {
            const { torneioId, clienteId, empresaId, torneioItemId, usuarioId } = req.body;

            // Validação básica
            console.log('torneioId', torneioId);
            console.log('clienteId', clienteId);
            console.log('empresaId', empresaId);
            console.log('torneioItemId', torneioItemId);
            console.log('usuarioId', usuarioId);
            if (!torneioId || !clienteId || !empresaId || !torneioItemId || !usuarioId) {
                throw new CustomError('Faltando informações em campos obrigatórios.', 400, '');
            }

            const torneioItem = await TorneioItem.findOne({ where: { id: torneioItemId } })
            if (!torneioItem) {
                throw new CustomError('Item do Torneio não encontrado para gerar Ticket.', 404, '');
            }

            const usuario = await Usuario.findOne({ where: { id: usuarioId } });

            const registro = await Ticket.create({
                ...req.body,
                status: 'PENDENTE',
                valorInscricao: torneioItem.valorInscricao,
                taxaAdm: torneioItem.taxaAdm,
                rake: torneioItem.rake,
                fichas: torneioItem.fichas,
                clienteIdPagou: clienteId,
            });

            await TicketHistorico.create({
                ticketId: registro.id,
                descricao: `Ticket criado por ${usuario?.nomeCompleto}`,
                usuarioId: usuarioId,
                data: new Date(),
                status: registro.status
            });

            return res.status(201).json(registro);
        } catch (error) {
            next(error);
        }
    },

    // async edit(req: any, res: any, next: any) {
    //     try {
    //         const id = req.params.id;

    //         const registro = await Torneio.findByPk(id);
    //         if (!registro) {
    //             throw new CustomError('Registro não encontrado.', 404, '');
    //         }

    //         // Atualizar apenas os campos que estão definidos (não são undefined)
    //         Object.keys(req.body).forEach(field => {
    //             if (req.body[field] !== undefined && field in registro) {
    //                 (registro as any)[field] = req.body[field];
    //             }
    //         });

    //         await registro.save();
    //         return res.status(200).json(registro);
    //     } catch (error) {
    //         next(error); // Passa o erro para o middleware de tratamento de erros
    //     }
    // },  

}