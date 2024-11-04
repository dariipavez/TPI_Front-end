// App.jsx
import React, { useState } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import Detalle from './componentes/Detalle'; // Importa Detalle
import { Router, Route } from "wouter"; // Importa Router y Route de wouter

function App() {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (query) => {
    setBusqueda(query);
  };

  return (
    <div className="App"> 
      <Router>
        {/* Pasamos handleBuscar a Navbar para actualizar la búsqueda */}
        <Menu busqueda={busqueda} onBuscar={handleBuscar} />
        <Route path="/detalle/:productId" component={Detalle} />
      </Router>
    </div>
  );
}

export default App;
