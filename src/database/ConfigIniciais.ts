import { Empresa } from '../models/Empresa'
import { FuncaoSistema, FuncaoUsuario, FuncaoUsuarioAcesso, Usuario, UsuarioFuncao } from '../models/Usuario'

module.exports = {
    configUsuario: async () => {
        const funcaoSistema = await FuncaoSistema.findOrCreate({
            where: {
                funcaoSistema: "Configurações"
            }
        })

        const funcaoUsuario = await FuncaoUsuario.findOrCreate({
            where: {
                funcaoUsuario: "Administrador"
            }
        })

        const funcaoUsuarioAcesso = await FuncaoUsuarioAcesso.findOrCreate({
            where: {
                idFuncaoSistema: funcaoSistema[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })

        const usuario = await Usuario.findOrCreate({
            where : {
                login: "Admin",
                email: "admin@tanztecnologia.com.br",                   
            },
            defaults: {
                login: "Admin",
                email: "admin@tanztecnologia.com.br",
                senha: "123456",                
                ativo: true,
                alterarSenha: false,
                nomeCompleto: "Administrador Tanz"             
            }
        })      

        const usuarioAcesso = await UsuarioFuncao.findOrCreate({
            where: {
                idUsuario: usuario[0].id,
                idFuncaoUsuario: funcaoUsuario[0].id
            }
        })

        await Empresa.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                nomeFantasia: "Tanz Tecnologia",
                razaoSocial: "Tanz Tecnologia",
                cnpj: "12345678901234",
                inscricaoEstadual: "123456789012",
                inscricaoMunicipal: "123456789012",
                dataInicioAtividades: new Date(),
                cep: "12345678",
                endereco: "Rua Teste",
                numero: "123",
                complemento: "",
                bairro: "Bairro Teste",
                idCidade: 1100015,
                logradouro: "Rua Teste",                
                telefone: "1234567890",
                regimeTributario: 'Simples Nacional',
                ambienteNFe: 'Homologação',
                tipo: 'principal'                
            }
        })
    }
}