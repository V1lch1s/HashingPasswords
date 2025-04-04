import React, { useContext } from 'react';
import { Container, Button } from '@mui/material';
import { Autenticacion } from './Autenticacion';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const { logout } = useContext(Autenticacion);
    const navigate = useNavigate(); // Hook para programar la navegación a vista

    const handleLogout = () => {
        logout();
        navigate('/LoginComponent');
    };

    return (
        <Container align="center">
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Cerrar Sesión
            </Button>
        </Container>
    );
};
export default LogoutComponent;