import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Tarjetadetalle from './componentes/Tarjetadetalle';
import TarjetaInfo from './componentes/TarjetaInfo'; // Importa TarjetaInfo
import Tarjetaconfirmacion from './componentes/TarjetaConfirmacion'; // Reemplaza Carrito por Tarjetaconfirmacion
import Agradecimiento from './componentes/Agradecimiento';
import Agregar from './componentes/Agregar'; // Importa el componente
import Perfil from './componentes/Perfil';

import { Router, Route } from "wouter";

function App() {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (query) => {
    setBusqueda(query);
  };

  return (
    <div className="App"> 
      <Router>
        <Route path="/">
          <Menu busqueda={busqueda} onBuscar={handleBuscar} />
        </Route>

        <Route path="/detalle/:productId" component={Tarjetadetalle} />

        {/* Cambia la ruta de /carrito a /confirmacion, y usa el componente Tarjetaconfirmacion */}
        <Route path="/confirmacion">
          <Tarjetaconfirmacion />
        </Route>

        <Route path="/info">
          <TarjetaInfo />
        </Route>

        <Route path="/agradecimiento">
          <Agradecimiento />
        </Route>

        <Route path="/agregar">
          <Agregar />
        </Route>

        <Route path="/perfil">
          <Perfil />
        </Route>
      </Router>
    </div>
  );
}

export default App;