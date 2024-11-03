"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Torneio_1 = require("../models/Torneio");
const TorneioWebSocket_1 = require("./TorneioWebSocket");
let timerId = null; // Armazena o ID do timer para poder limpar o intervalo
// Função que busca o torneio em andamento ou parado no banco
async function buscarTorneioEmAndamentoOuParado() {
    const torneio = await Torneio_1.Torneio.findOne({
        where: {
            status: ['Criado', 'parado', 'em andamento'],
        },
        include: [{
                model: Torneio_1.TorneioBlindItem,
                as: 'blindItem',
                required: false,
            }]
    });
    return torneio || null;
}
async function buscarProximoNivel(torneio) {
    const blinds = await Torneio_1.TorneioBlindItem.findAll({
        where: { torneioId: torneio.id },
        order: [['order', 'ASC']],
    });
    const indiceBlindAtual = blinds.findIndex(b => b.id === torneio.blindItemAtual);
    return blinds[indiceBlindAtual + 1] || null;
}
async function buscarEEnviarTorneio() {
    const torneio = await buscarTorneioEmAndamentoOuParado();
    if (!torneio) {
        console.log('Nenhum torneio encontrado');
        return;
    }
    const blind = await buscarProximoNivel(torneio);
    if (torneio) {
        (0, TorneioWebSocket_1.enviarAtualizacaoTorneio)(torneio);
    }
    else {
        console.log('Nenhum torneio encontrado');
    }
}
// Função que inicia o torneio e a contagem dos blinds
async function iniciarTorneio(callback) {
    const torneio = await buscarTorneioEmAndamentoOuParado();
    if (!torneio) {
        throw new Error('Nenhum torneio disponível para iniciar.');
    }
    const proximoNivel = await buscarProximoNivel(torneio);
    if (!torneio) {
        throw new Error('Nenhum torneio disponível para iniciar.');
    }
    if (torneio.status === 'em andamento') {
        throw new Error('Torneio já está em andamento.');
    }
    torneio.status = 'em andamento';
    await torneio.save();
    iniciarContagemBlinds(torneio, proximoNivel, callback);
    return torneio;
}
// Função que pausa o torneio
async function pararTorneio() {
    const torneio = await buscarTorneioEmAndamentoOuParado();
    if (!torneio || torneio.status !== 'em andamento') {
        throw new Error('Torneio não está em andamento.');
    }
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    torneio.status = 'parado';
    await Torneio_1.Torneio.update({ status: 'parado' }, { where: { id: torneio.id } });
    return torneio;
}
// Função responsável por iniciar a contagem regressiva dos blinds
function iniciarContagemBlinds(torneio, proximoNivel, callback) {
    if (timerId) {
        clearInterval(timerId);
    }
    let atualizarTorneio = false;
    timerId = setInterval(async () => {
        torneio.tempoRestanteNivel--;
        if (torneio.tempoRestanteNivel <= 0) {
            await trocarNivel(torneio, callback);
            atualizarTorneio = true;
        }
        // Atualiza o torneio a cada segundo
        await torneio.save();
        if (atualizarTorneio) {
            let torneioAtualizado = await Torneio_1.Torneio.findOne({
                where: {
                    id: torneio.id,
                },
                include: [{
                        model: Torneio_1.TorneioBlindItem,
                        as: 'blindItem',
                        required: false,
                    }]
            });
            proximoNivel = await buscarProximoNivel(torneio);
            if (torneioAtualizado) {
                torneio = torneioAtualizado;
                atualizarTorneio = false;
            }
            else {
                throw new Error('Erro ao atualizar o torneio.');
            }
        }
        // Chama o callback sempre com o torneio atualizado e o próximo nível
        callback({ torneio, proximoNivel });
    }, 1000);
}
// Função que troca para o próximo nível de blinds
async function trocarNivel(torneio, callback) {
    const blinds = await Torneio_1.TorneioBlindItem.findAll({
        where: { torneioId: torneio.id },
        order: [['order', 'ASC']],
    });
    const indiceBlindAtual = blinds.findIndex(b => b.id === torneio.blindItemAtual);
    if (indiceBlindAtual === -1 || indiceBlindAtual >= blinds.length - 1) {
        finalizarTorneio(torneio, callback);
        return;
    }
    const proximoBlind = blinds[indiceBlindAtual + 1];
    if (proximoBlind) {
        torneio.blindItemAtual = proximoBlind.id;
        torneio.tempoRestanteNivel = proximoBlind.duracao * 60;
        await torneio.save();
        // Aqui está a chamada ao callback que deve incluir o próximo nível
        // callback(torneio); // Envia o torneio e o próximo nível
    }
    else {
        finalizarTorneio(torneio, callback);
    }
}
// Função para finalizar o torneio quando os níveis acabam
async function finalizarTorneio(torneio, callback) {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    torneio.status = 'finalizado';
    await Torneio_1.Torneio.update({ status: 'finalizado' }, { where: { id: torneio.id } });
    callback(torneio, null); // Passa null para o próximo nível, pois o torneio foi finalizado
}
exports.default = {
    iniciarTorneio,
    pararTorneio,
    buscarTorneioEmAndamentoOuParado,
    buscarEEnviarTorneio,
};
