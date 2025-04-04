import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autenticacion } from './Autenticacion'; // Contexto de autenticación
import { TextField, Button, Container, Typography } from '@mui/material';

const SignUpComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, signUp } = useContext(Autenticacion); // Usar el contexto de Autencticación
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        // Usuario autenticado
        e.preventDefault(); // Si quito esto, el frontend no cambia de estado
        // Lo que hace es prevenir recargas innecesarias de la página
        
        // Registrar usuario
        const success = await signUp(username, password);
        // Inicio de sesión
        const success2 = await login(username, password);

        /* Cloud Firestore */
        console.log('usuario:', username, 'password:', password);
        // Aparece en la consola del navegador
        if (success && success2) {
            navigate("/Home", { replace: true }); // Redirige a Home

            // Fuerzo la recarga de la página
            //window.dispatchEvent(new Event("appRefresh"));
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Registrarse
            </Typography>
            <form onSubmit={handleSignUp}>
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
                    Regístrate
                </Button>
            </form>
        </Container>
    );
};
export default SignUpComponent;