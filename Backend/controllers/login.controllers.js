import db from "../utils/firebase.js";
import { cryptPass, verifyPasswd } from "../utils/hashing.js";
import generateToken from "../utils/generateToken.js";
import verifyToken from '../utils/verifyToken.js';
import next from 'jsonwebtoken';
// Verifico si existe la colección y el id de usuario
/*console.log("Documento con ID:", 'ejemplo1');
const docSnap = await db.collection('users').doc('ejemplo1').get();
console.log('Existe?', docSnap.exists);*/

// Verifico el valor de la sal almacenada
/*const docSnapshot = await db.collection('users').doc('ejemplo1').get();
console.log(docSnapshot.data().salt);*/

// Inicio de Sesión con Cloud Firestore
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Datos ingresados por el usuario

    //console.log(req.body);

    if (!username || !password) {
      return res.status(400).json({
        isLogin: false,
        error: "Nombre de usuario y contraseña requeridos"
      });
    }

    // 1. Buscar el usuario en Firestore
    const usersRef = db.collection('users');
    
    const snapshot = await usersRef
      .where('usuario', '==', username)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        isLogin: false,
        error: "El usuario no existe"
      });
    }

    // 2. Obtener los datos del usuario
    const userDoc = snapshot.docs[0]; // No hay recordset
    const userData = userDoc.data();
    // Objeto con los datos de la referencia 
    // de Cloud Firestore

    // 3. Verificar la contraseña
    const passwdIngresada = verifyPasswd(password, userData.salt);
    const isLogin = userData.contrasenia === passwdIngresada;

    if (!isLogin) {
      return res.status(400).json({
        isLogin: false,
        error: "Credenciales inválidas"
      });
    }
    
    // 4. Genera el token jwt
    //console.log('userDoc:', userDoc.id);
    verifyToken(userDoc, userData, next);
    // ########  Intentar:
    // El verifyToken no toma las credenciales del usuario porque el req no lo contiene.
    // El username y el id se puedan utilizar en el generateToken.
    // Verificar que el método que tengo de verifyToken incluya el token en headers
    // Que el token se imprima en en la consola del navegador web
    // La solicitud completa debe ser: 
    /* Headers { "content-length" → "28", "content-type" → "application/json; charset=utf-8",
      "token" → "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLC
      JuYW1lIjoiRnJ1bWVuIE9saXZhcyIsImlhdCI6NTExMjY5MDIyLCJleHAiOjM
      2NjcwOTExMjB9.D1cZxxEE4tjeT9PXgS3dMlCLj17XoG8eO5k4dcf2w9g"}
    */


    console.log(res.headers.get('token')); // Debería estar actualizado
    // verifyToken ? res.status(200).json({}) : generateToken && Notificar
    //console.log('Campo de autorización del Header:', req.headers['Authorization']);
    //console.log('Token JWT:', generateToken(userDoc, userData));
    
    // 5. Respuesta con el token y datos públicos del usuario
    res.status(200).json({
      isLogin: true,
      token, // Barer Token
      user: {
        id: userDoc.id,
        usuario: userData.usuario,
        token: userData.token // Token del usuario
        //email: userData.email
        //rol: userData.rol
        //...userData // Copia todas las propiedades
                      // de userData aquí en user
      }
    });

  } catch (error) {
    if (error instanceof TypeError) {
      res.status(401).json({
          message: 'Falta el Token'
      });
    }
    console.error("Error de Login:", error);
    /*res.status(500).json({
      isLogin: false,
      error: "Error interno del servidor"
    });*/
  }
};

// Registro de Usuario con Cloud Firestore
export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Datos del usuario

    console.log(req.body); // Registro de credenciales
                           // ingresadas

    if (!username || !password) { // Si no hay, sale Error
      return res.status(400).json({
        isLogin: false,
        error: "No se ingresaron bien las credenciales"
      });
    }

    // 1. Verificar si el usuario ya existe
    const usersRef = db.collection('users');

    const snapshot = await usersRef
      .where('usuario', '==', username)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return res.status(401).json({
        success: false,
        error: "Nombre de usuario no disponible"
      });
    }

    // 2. Generar hash y sal
    const { hash, salt } = cryptPass(password);

    // 3. Crear el documento de Firestore
    const newUserRef = db.collection('users').doc();
    
    // Nueva referencia con id autogenerado
    await newUserRef.set({
      id: newUserRef.id, // id generado
      usuario: username,
      contrasenia: hash,
      salt: salt,
      //token: token // Y todos los demás 
                   // datos que debe tener el usuario
    });

    // 4. Respuesta Exitosa
    res.status(201).json({
      success: true, // Registro válido
      user: {
        id: newUserRef.id,
        usuario: username
        // email y otros datos si se manejan
      }
    });

  } catch(error) {
    console.error("Error al Registrar el usuario:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
};