import { useState } from 'react';
import '../App.css';

const UserComponent = () => {
    const [nombreUsuario, setNombre] = useState("Nombre de Usuario"); // Estado para el nombre
    const [showModal, setShowModal] = useState(false); // Estado que muestra el modal
                        // El Modal es la ventana para actualizar el nombre de usuario

    return (
        /* input que controla el nombre de usuario */
        /*<p>Introducir Nombre:&nbsp;
        <input
            type = "text"
            value = {nombreUsuario} // Siempre es el estado
            onChange = {(e) => setNombre(e.target.value)} // Actualización de estado
        />
        </p>*/
        <>
            <div align="center">
                <button className="boton-nombre" onClick={() => setShowModal(true)}>Escribe tu nombre</button>

                {/* Aquí ponemos el modal con el input */}
                {showModal && (
                    <div className="modal">
                        <div className="contenido-modal">
                            <div className="quit-button-holder">
                                <button className="quit-button" onClick={() => setShowModal(false)}>x</button>
                            </div>
                            <h2>Introduce tu nombre</h2>
                            <input
                                type = "text"
                                value = {nombreUsuario} // Siempre es el estado
                                onChange = {(e) => setNombre(e.target.value)} // Actualización de estado
                                placeholder = "Tu Nombre"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Título Centrado */}
            <h1 classname="title" align="center">Hello, {nombreUsuario}</h1>
        </>
    );
};
export default UserComponent;