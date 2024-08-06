import { verifyToken } from '../utils/jwtUtils'; 
import { CustomError } from '../utils/customError'

const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Suporta "Bearer <token>"

  if (!token) {
    throw new CustomError('Token de autenticação não fornecido.', 401, '');
    // return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Adiciona usuário decodificado ao req
    next();
  } catch (error) {
    throw new CustomError('Token de autenticação inválido.', 403, '');
    // return res.status(403).json({ message: 'Token de autenticação inválido.' });
  }
};

module.exports = { authenticate };
