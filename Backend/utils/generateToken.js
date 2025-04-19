import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';

const mi_Secretito = config.auth.mi_Secretito;

//console.log('Mi secretito', mi_Secretito);
const token = (userDoc, userData) => {
    return jwt.sign(
        {
        id: userDoc.id,
        usuario: userData.usuario
        // Más datos del usuario seguros
        },
        mi_Secretito,
        { expiresIn: '2h' } // La sesión del usuario dura 2 horas
    );
};
// Si ya expiró, generar uno nuevo
// y enviar al front y a la DB

export default token;