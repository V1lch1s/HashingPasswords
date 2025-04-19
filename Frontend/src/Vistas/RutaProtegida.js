import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Autenticacion } from './Autenticacion'; // Importamos el contexto de Autenticacion

const RutaProtegida = ({ children }) => {
    const { estaAutenticado } = useContext(Autenticacion);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // Revisa si hay un usuario almacenado

    // No está autenticado, redirige al login
    if (!estaAutenticado  && !storedUser /*&& !autorizedToken*/) {
        return <Navigate to="/LoginComponent" replace />;
    }

    // Sí está autenticado, muestra el componente solicitado
    return children;
};
export default RutaProtegida;