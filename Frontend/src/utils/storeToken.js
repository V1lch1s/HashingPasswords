// Validar la expiración del token
const storeToken = async () => {
    // Se obtiene del almacenamiento local
    return localStorage.getItem("token");
};

export default storeToken;

// Si el token no es válido, error