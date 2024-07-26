require('dotenv').config()
const express = require('express')
const routes = require('./src/routes')
require('./src/database/index')
const mssql = require('mssql')
const cors = require('cors')
const fileupload = require('express-fileupload')
var path = require('path')
var public = path.join(__dirname, 'public')

const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({extended: true}))
server.use(fileupload())
server.use('/', express.static(public))
server.use(routes)

server.get('/',  (req, res) => {
    res.send('Hello World ');
});

server.listen(process.env.PORT, () => {
    console.log(` - Rodando no endereço : ${process.env.BASE}`)
})