import logo from '../Sun3.png';
import { Container, Typography } from '@mui/material';

const Home = () => { // Lo cambié de home a Home porque es un componente y tiene que empezar con mayúscula.
    return (
        <Container align="center">
            <Container>
                <img src={logo} className="App-logo" alt="logo" />
            </Container>
            <Typography variant="h3" align="center" gutterBottom>
                Página de Inicio
            </Typography>
        </Container>
    );
};
export default Home;