import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Footer from '@mui/material';
import Navbar from './Vistas/Navbar';
import GameComponent from './Vistas/GameComponent'; 
import UserComponent from './Vistas/UserComponent';
import LoginComponent from './Vistas/LoginComponent'; // { ExportacionNombrada }
import LogoutComponent from './Vistas/LogoutComponent';
import SignUpComponent from './Vistas/SignUpComponent';
import Home from './Vistas/Home';
import RutaProtegida from './Vistas/RutaProtegida'; // Componente de ruta protegida
import Reinicio from './Vistas/Reinicio';
import List from './pages/List';
import Add from './Vistas/Add';

function App() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const result = await fetch("http://localhost:5000/items/");
    const data = await result.json();
    setItems(data);
  };

  const add = async (item) => {
    const result = await fetch("http://localhost:5000/items/", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(item), });
    const data = await result.json();
    setItems([...items, data.item]);
  };

  const del = async (id) => {
    await fetch("http://localhost:5000/items/" + id, {method:"DELETE"});
    setItems(items.filter((item) => item.id !== id));
  };

  // El login lo incrusté en Autentication.js

  return (
    <div>
      <BrowserRouter>
        {/* Redirige a Home cuando racargas la página */}
        <Reinicio />
        
        {/* NavBar siempre visible */}
        <Navbar />
        <Routes>
          <Route path="/Home" element={<RutaProtegida><Home /></RutaProtegida>} />
          <Route path="/UserComponent" element={<RutaProtegida><UserComponent /></RutaProtegida>} />
          <Route path="/GameComponent" element={<RutaProtegida><GameComponent /></RutaProtegida>} />
          <Route path="/LogoutComponent" element={<RutaProtegida><LogoutComponent /></RutaProtegida>} />
          <Route path="/items" element={<RutaProtegida><List items={items} ondelete={del} /></RutaProtegida>} />
          <Route path="/add" element={<RutaProtegida><Add add={add} /></RutaProtegida>} />
          <Route path="/LoginComponent" element={<LoginComponent />} />
          <Route path="/SignUpComponent" element={<SignUpComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Envuelve la aplicación en BrowserRouter. Puede ser aquí o en index.js
export default App;

// Nota: La única diferencia entre un .js y un .jsx es que
//       la x ayuda a identificar que el archivo contiene 
//       formato XML.