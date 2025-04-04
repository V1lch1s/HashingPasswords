import crypto from "crypto";
import { config } from "./config.js"; // Manejo de variables de entorno

// ECMAScript para uso en Backend y Frontend
// Common js para uso en Backend

//let pass = "123456"; // Para probar en consola -> node hashing.js
//let salt = "epUJJ5-L7TEC7zL58TF_aXWJkvsn8-zFEjldmq0rfAB9eaqzdiJNaI2meCQxKh3DW6Lpb_GhjrVfqIEX4dEp0w";

export function cryptPass(pass) {
    if (!pass) throw new Error("No se proporcionó un password válido");
    // Si no hay contraseña, marca error

    const pepper = config.auth.pepper;
    // Variable de entorno privada con la pimienta

    if (!pepper) {
        throw new Error("La variable de entorno PEPPER no está definida.");
    } else {
        const saltBytes = crypto.randomBytes(64); // Sal de 64 bytes
        const salt = saltBytes.toString('base64url');
        // LA SAL SIEMPRE ES DIFERENTE

        const newStr = salt + pepper + pass;
        // Agrego la pimienta al string

        const hashing = crypto.createHash('sha384');
        // md4, md5, sha1, sha224, sha256, sha384, sha512

        const hash = hashing.update(newStr).digest('base64url');
        // binary, hex, base64, base64url

        return {hash, salt};
        // Retorna un objeto con la sal y el hash
    }
}

//const { hash, salt } = cryptPass(pass)
//console.log(salt.toString('base64url') + " : " + hash);
// Para probar en la consola

// Función para verificar el password, devuelve el hash del lado del cliente
export function verifyPasswd(pass, salt) {
    if (!pass) throw new Error("No se proporcionó un password válido");
    // Si no hay contraseña, marca error

    const pepper = config.auth.pepper;
    // Variable de entorno privada con la pimienta

    if (!pepper) {
        throw new Error("La variable de entorno PEPPER no está definida.");
    } else {
        const newStr = salt + pepper + pass;
        // Agrego la pimienta al string
        // LA SAL ES LA QUE TIENE EL USUARIO

        const hashing = crypto.createHash('sha384');
        // md4, md5, sha1, sha224, sha256, sha384, sha512

        const hash = hashing.update(newStr).digest('base64url');
        // binary, hex, base64, base64url

        return hash;
    }
}

//console.log(verifyPasswd(pass, salt));
// Para probar en la consola