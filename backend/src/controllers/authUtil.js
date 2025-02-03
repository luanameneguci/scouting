const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

const getUserIdFromToken = (token) => {
  if (!token) throw new Error('Token not provided');
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { id: decoded.id, nome: decoded.nome, tipo: decoded.tipo }; // Explicit property names
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { getUserIdFromToken };
