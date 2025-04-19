import React, { createContext, useState, useEffect } from 'react';
import storeToken from '../utils/storeToken.js';
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
            // Verificamos que el token está en almacenamiento local
            const token = storeToken();

            const send = await fetch("http://localhost:5000/login/", {
                method:"POST", //                                ___ En el header no es visible
                //                                              /                              
                headers:{"Content-type":"application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(
                    {username: username, password: passwd}), // Es visible en el navegador
                    // Ahora envia el username y el passwd
                    // como objeto con propiedades username
                    // y password.
            });
            
            //console.log(send);
            // Aparece en la consola del navegador

            if (send.status === 401) {
                console.log(send.headers);
            } else {
                throw new Error(`¡error HTTP! status: ${send.status}`);
            }

            const data = await send.json();
            // Se convierte la respuesta a .json
            
            if (data.isLogin) {
                const userData = { 
                    username,
                    passwd,
                    token: data.token // Se guarda el token de la API
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
            const send = await fetch("http://localhost:5000/signUp/", {
                method: "POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify({
                    username: user,
                    password: pass,
                    //token: token
                }),
            });

            console.log(send);
            console.log('Usuario creado');
            // Aparece en la consola del navegador

            if (!send.ok) {
                throw new Error(`¡error HTTP! status: ${send.status}`);
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