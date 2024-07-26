
const Usuario = require('../models/Usuario');

module.exports = {
    private : async (req, res, next) => {
        if (!req.query.token && !req.body.token) {
            res.json({notallowed: true});
            return;
        }

        let token = ''
        if (req.query.token) {
            token = req.query.token
        }

        if (req.body.token) {
            token = req.body.token
        }

        if (token == '') {
            res.json({notallowed: true});
            return;
        }
        
        const user = await Usuario.findAll({where: {token}})
        
        if (!user[0]) {
            res.json({notallowed: "token não encontrado"});            
            return;
        }        

        next();
    }
}