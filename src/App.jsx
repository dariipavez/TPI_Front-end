import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle';
import TarjetaInfo from './componentes/TarjetaInfo'; // Importa TarjetaInfo
import { Router, Route } from "wouter";

function App() {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (query) => {
    setBusqueda(query);
  };

  return (
    <div className="App"> 
      <Router>
        {/* Temporalmente muestra TarjetaInfo en la ruta raíz */}
        <Route path="/" component={TarjetaInfo} />

        {/* Comenta o quita la línea de Menu temporalmente */}
        {/* <Menu busqueda={busqueda} onBuscar={handleBuscar} /> */}

        <Route path="/detalle/:productId" component={Detalle} />
        <Route path="/info" component={TarjetaInfo} /> {/* Ruta normal de TarjetaInfo */}
      </Router>
    </div>
  );
}

export default App;
