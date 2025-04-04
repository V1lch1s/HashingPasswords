import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Autenticacion } from './Autenticacion'; // Contexto de autenticación

const Navbar = () => {
    const { estaAutenticado } = useContext(Autenticacion);

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexgrow: 1 }}>
                    Mi App
                </Typography>
                <Button color="inherit" component={Link} to="/Home">Home</Button>
                <Button color="inherit" component={Link} to="/GameComponent">Juego</Button>
                <Button color="inherit" component={Link} to="/UserComponent">Usuario</Button>
                
                {/* Login y Logout */
                estaAutenticado ? (
                    <Button color="inherit" component={Link} to="/LogoutComponent">Log out</Button>
                ) : (
                    <Button color="inherit" component={Link} to="/LoginComponent">Log in</Button>
                )}

                <Button color="inherit" component={Link} to="/SignUpComponent">Sign Up</Button>
            </Toolbar>
        </AppBar>
        /*
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/game">Game</Link></li>
                <li><Link to="/login">Log In</Link></li>
            </ul>
        </nav>
        */
    );
};
export default Navbar;