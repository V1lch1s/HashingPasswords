import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autenticacion } from './Autenticacion'; // Contexto de autenticación
import { TextField, Button, Container, Typography } from '@mui/material';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(Autenticacion); // Usar el contexto de Autencticación
    const navigate = useNavigate();
    const { logout } = useContext(Autenticacion); // Para probar el alternado de vistas
    
    const handleLogin = async (e) => {
        // Usuario autenticado
        e.preventDefault(); // Si quito esto, el frontend no cambia de estado
        // Lo que hace es prevenir recargas innecesarias de la página
        
        const success = await login(username, password);

        // Juguete
        /*if (username === 'BestWebpage' && password === '1234') {
            login(username); // Usuario autenticado
            navigate('/Home'); // Redirige a Home
        } else {
            alert('Credenciales Incorrectas');
        }*/

        /* Cloud Firestore */
        //console.log('usuario:', username, 'password:', password);
        // Aparece en la consola del navegador
        if (success) {
            navigate("/Home", { replace: true }); // Redirige a Home

            // Fuerzo la recarga de la página
            //window.dispatchEvent(new Event("appRefresh"));
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Usuario"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Iniciar Sesión
                </Button>

                <Button variant="contained" color="secondary" onClick={logout}>
                    Cerrar Sesión
                </Button>
            </form>
        </Container>
    );
};
export default LoginComponent;