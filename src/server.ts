require('dotenv').config()
// const express = require('express')
import express from 'express'
const authRoutes = require('./routes/authRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const cidadeRoutes = require('./routes/cidadeRoutes')
const ClienteFornecedorRoutes = require('./routes/clienteFornecedorRoutes')
const empresaRoutes = require('./routes/empresaRoutes')
const enderecoRoutes = require('./routes/enderecoRoutes')
const blindRoutes = require('./routes/blindRoutes')

require('./database/index')
const cors = require('cors')
const fileupload = require('express-fileupload')
var path = require('path')
var publicDir = path.join(__dirname, 'public')
const errorHandler = require('./middlewares/errorHandler')

const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(fileupload())
server.use('/', express.static(publicDir))
server.use(authRoutes)
server.use(usuarioRoutes)
server.use(cidadeRoutes)
server.use(ClienteFornecedorRoutes)
server.use(empresaRoutes)
server.use(enderecoRoutes)
server.use(blindRoutes)

// erros
server.use(errorHandler)

server.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

server.listen(process.env.PORT, () => {
    console.log(` - Rodando no endereço : ${process.env.BASE}`)
})