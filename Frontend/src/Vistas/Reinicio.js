import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Reinicio = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Obtiene la ruta actual

    useEffect(() => { // Redirige a Home
        // Si no estás en /Home, redirige a /Home
        if (location.pathname !== "/Home")
            navigate("/Home");
    }, []); // Arreglo de dependencias vacío para que solo se ejecute en el montaje inicial

    return null; // No dibuja nada
};
export default Reinicio;