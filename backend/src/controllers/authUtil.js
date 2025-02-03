const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

const getUserIdFromToken = (token) => {
  if (!token) throw new Error('Token not provided');
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id; // Assuming the token payload has the user ID as `id`
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { getUserIdFromToken };
