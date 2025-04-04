import React, { createContext, useState, useEffect } from 'react';
//import getItems from '../App.js';
// Crear el contexto de autenticación
// Un contexto permite compartir datos globales, como un estado global
export const Autenticacion = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => { // Cargamos al principio el usuario desde el almacenamiento local
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            //getItems(); // Obtenemos los items de la BD
        }
    }, []);

    // Función para iniciar sesión
    const login = async (username, passwd) => {
        try {
            const result = await fetch("http://localhost:5000/login/", {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(
                    {username: username, password: passwd}),
                    // Ahora envia el username y el passwd
                    // como objeto con propiedades username
                    // y password.
            });
            
            console.log(result);
            // Aparece en la consola del navegador

            if (!result.ok) {
                throw new Error(`¡error HTTP! status: ${result.status}`);
            }

            const data = await result.json();
            // Se convierte la respuesta a .json
            
            if (data.isLogin) {
                const userData = { 
                    username,
                    passwd
                    //token: data.token // Se guarda el token de la API
                };
                //console.log("Token:" + data.token);
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                
                return true; // Inicio de sesión exitoso
            }
        } catch (error) {
            console.error("Login Failed:", error);
            return false; // Inicio de Sesión fallido
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Función para Registrarse
    const signUp = async (user, pass) => {
        try {
            const result = await fetch("http://localhost:5000/signUp/", {
                method: "POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify({
                    username: user,
                    password: pass
                }),
            });

            console.log(result);
            // Aparece en la consola del navegador

            if (!result.ok) {
                throw new Error(`¡error HTTP! status: ${result.status}`);
            }

            return true;
        } catch (error) {
            console.error("Registro fallido:", error);
            return false; // Registro fallido
        }
    };

    return (                                             //     v-- Si user es null o undefined, es false
        <Autenticacion.Provider value={{ user, estaAutenticado: !!user, login, logout, signUp }}>
            { children }
        </Autenticacion.Provider>
    );
};