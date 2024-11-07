import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle';
import Carrito from './componentes/Carrito'; // Página del carrito
import TarjetaInfo from './componentes/Tarjetainfo'; // Asegúrate de que la ruta sea correcta
import Agradecimiento from './componentes/Agradecimiento';
import Retro from './componentes/Retro';
import Agregar from './componentes/Agregar'; // Importa el componente

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

        <Route path="/detalle/:productId" component={Detalle} />

        <Route path="/carrito">
          <Carrito />
        </Route>

        <Route path="/info">
          <TarjetaInfo />
        </Route>

        <Route path="/agradecimiento">
          <Agradecimiento />
        </Route>

        <Route path="/retro">
          <Retro />
        </Route>

        <Route path="/agregar">
         <Agregar />
        </Route>
      </Router>
    </div>
  );
}

export default App;
