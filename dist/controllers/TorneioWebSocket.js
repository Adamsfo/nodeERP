"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarServidorWebSocket = iniciarServidorWebSocket;
exports.enviarAtualizacaoTorneio = enviarAtualizacaoTorneio;
const ws_1 = __importDefault(require("ws"));
const TorneioService_1 = __importDefault(require("./TorneioService"));
let wss = null;
// Função para iniciar o servidor WebSocket
function iniciarServidorWebSocket(server) {
    try {
        wss = new ws_1.default.Server({ server });
        wss.on('connection', (ws) => {
            console.log('Novo cliente conectado');
            // Envia uma mensagem de boas-vindas ao cliente conectado
            // ws.send(JSON.stringify({ message: 'Bem-vindo', status: 'conectado' }));
            // Envia o status inicial do torneio
            TorneioService_1.default.buscarEEnviarTorneio();
            // Escuta o fechamento da conexão do cliente
            ws.on('close', () => {
                console.log('Cliente desconectado');
            });
        });
        console.log('Servidor WebSocket iniciado e aguardando conexões');
    }
    catch (error) {
        console.error('Erro ao iniciar o servidor WebSocket:', error);
    }
}
// Função para enviar atualização do torneio para todos os clientes conectados
function enviarAtualizacaoTorneio(torneio) {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(JSON.stringify(torneio));
            }
        });
    }
}
