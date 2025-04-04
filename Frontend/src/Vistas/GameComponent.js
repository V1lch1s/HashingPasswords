import { useState } from "react"; // Importa useState para incrementar el valor del número

const GameComponent = () => {
    // Estado que almacena el número
    const [number, setNumber] = useState(0); // Estado inicial 0
    
    // Función que incrementa el número
    const incrementNumber = () => {
        setNumber(number + 1);
    };

    return (
        /* Número y botón "Add" */
        <div align="Center">
            <p>{number}</p>
            <button onClick={incrementNumber}>add</button>
        </div>
    );
};
export default GameComponent;