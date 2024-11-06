import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle';
import Carrito from './componentes/Carrito'; // Página del carrito
import TarjetaInfo from './componentes/Tarjetainfo'; // Asegúrate de que la ruta sea correcta

import { Router, Route } from "wouter";

function App() {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (query) => {
    setBusqueda(query);
  };

  return (
    <div className="App">
      <Router>
        {/* Ruta para la pantalla principal (Menu) */}
        <Route path="/">
          <Menu busqueda={busqueda} onBuscar={handleBuscar} />
        </Route>

        {/* Ruta para la pantalla de detalle */}
        <Route path="/detalle/:productId">
          <Detalle />
        </Route>

        {/* Ruta para la página del carrito */}
        <Route path="/Carrito">
          <Carrito />
        </Route>

        {/* Ruta para la página de información de pago */}
        <Route path="/Info">
          <TarjetaInfo /> {/* Página donde se va a redirigir el usuario al hacer "Proceder al pago" */}
        </Route>
      </Router>
    </div>
  );
}

export default App;
