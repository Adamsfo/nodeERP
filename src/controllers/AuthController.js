const { Usuario } = require('../models/Usuario')
const { generateToken } = require('../utils/jwtUtils')
const CustomError = require('../utils/customError')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { login, senha } = req.body;

      if (!login || !senha) {
        throw new CustomError('Email e senha são obrigatórios.', 400, '');
        // return res.status(400).json({ message: 'Email e senha são obrigatórios.' });

      }

      const isEmail = login.includes('@')

      let usuario = []
      if (isEmail) {
        usuario = await Usuario.findOne({ where: { email: login } });
      } else {
        usuario = await Usuario.findOne({ where: { login } });
      }

      if (!usuario || !(await usuario.verifyPassword(senha))) {
        throw new CustomError('Credenciais inválidas.', 401, '');
        // return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const token = generateToken(usuario);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  addLogin: async (req, res, next) => {
    try {
      const { login, email, senha } = req.body;

      if (!login || !senha || !email) {
        throw new CustomError('Login, email e senha são obrigatórios.', 400, '');
      }

      let registro = await Usuario.findOne({ where: { email } })
      if (registro) {
        throw new CustomError('Este email já foi cadastrado, utilize recuperar senha.', 400, '');
      }

      registro = await Usuario.findOne({ where: { login } })
      if (registro) {
        throw new CustomError('Este login já foi utilizado por outro usuário .', 400, '');
      }

      registro = await Usuario.create({ login, email, senha });

      return res.status(201).json(registro);
    } catch (error) {
      next(error);
    }
  },
}
