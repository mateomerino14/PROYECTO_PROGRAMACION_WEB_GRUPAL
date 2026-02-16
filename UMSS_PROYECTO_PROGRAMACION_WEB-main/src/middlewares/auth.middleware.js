import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }
  const parts = authHeader.split(' ');
  if (parts.length < 2) {
    return res.status(403).json({ message: 'Malformed token. Expected format: Bearer <token>' });
  }
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'TokenExpired', 
          detail: 'El token ha caducado, por favor inicie sesión nuevamente.' 
        });
      }
      return res.status(401).json({ message: 'Unauthorized / Token Inválido' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ 
        message: 'No tienes permisos para realizar esta acción. (Forbidden)' 
      });
    }
    next();
  };
}
