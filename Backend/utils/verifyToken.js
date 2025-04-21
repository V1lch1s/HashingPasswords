import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';
import generateToken from '../utils/generateToken.js';

// Función flecha verifyToken (middleware)
//                    __ Objeto de solicitud
//                   |     __ Objeto de respuesto
//                   |    |                         __ La función de Express que permite continuar
//                   v    v                        v   con el siguiente middleware o controlador
const verifyToken = (req, res, userDoc, userData, next ) => {
    console.log('userDoc.id:', userDoc.id);
    try {
        // Extraigo el token del encabezado de Autorización
        const requestHeader = req.headers['Authorization'];

        console.log('Authorization Header:', requestHeader);

        /*if (!requestHeader)
            return res.status(401).json({
                message: 'Falta el Token'
            });*/

        const token = requestHeader.split(' ')[1];
        // Obtiene el token después de "Bearer "
        
        console.log('Token2verify:', token);

        /*if (!token)
            return res.status(401).json({
                message: 'Falta el Token'
            });*/
        
        jwt.verify(token, config.auth.mi_Secretito, (err/*, user*/) => {
            /*if (err) 
                return res.status(403).json({
                    message: 'Token inválido o expirado' 
                });*/

            //req.user = user; // Payload decodificado
            next();
        });
    } catch(err) {
        console.log(err);

        // instanceof determina si err es una instancia de TypeError
        if (err instanceof TypeError) {
            const token = generateToken(userDoc, userData);
            res.setHeader('token', JSON.stringify(token)); // Modificamos el res por valor
            //console.log(res.headers.get('token'));
            // json es de express y JSON es de la interfaz de js
            // embebida en los navegadores web por defecto

            //console.error('Caught a TypeError:', err.message);
        } else {
            console.error('Error desconocido:', err);
        }
    }
};

export default verifyToken;