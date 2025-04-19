import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';

// Función flecha verifyToken (middleware)
//                    __ Objeto de solicitud
//                   |     __ Objeto de respuesto
//                   |    |     __ La función de Express que permite continuar
//                   v    v    v   con el siguiente middleware o controlador
const verifyToken = (req, res, next) => {
    // Extraigo el token del encabezado de Autorización
    const requestHeader = req.headers['Authorization'];

    if (!requestHeader)
        return res.status(401).json({
            message: 'Falta el Token'
        });

    const token = requestHeader.split(' ')[1];
    // Obtiene el token después de "Bearer "
    
    if (!token) 
        return res.status(401).json({
            message: 'Falta el Token'
        });
    
    jwt.verify(token, config.auth.mi_Secretito, (err, user) => {
        if (err) 
            return res.status(403).json({
                message: 'Token inválido o expirado' 
            });

        req.user = user; // Payload decodificado
        next();
    });
};

export default verifyToken;