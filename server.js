require('dotenv').config()
const express = require('express')
const authRoutes = require('./src/routes/authRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
require('./src/database/index')
const cors = require('cors')
const fileupload = require('express-fileupload')
var path = require('path')
var public = path.join(__dirname, 'public')
const errorHandler = require('./src/middlewares/errorHandler')

const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(fileupload())
server.use('/', express.static(public))
server.use(authRoutes)
server.use(usuarioRoutes)
server.use(errorHandler)

server.get('/', (req, res) => {
    res.send('Hello World ');
});

server.listen(process.env.PORT, () => {
    console.log(` - Rodando no endereço : ${process.env.BASE}`)
})