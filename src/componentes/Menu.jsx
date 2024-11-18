import React, { useState } from 'react';
import { Router, Route, Switch } from 'wouter';
import './Menu.css';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaProductos from './Tarjetaproductos';
import Tarjetadetalle from './Tarjetadetalle';
import Agregar from './Agregar';
import './Modal.css';

const Menu = ({ busqueda, onBuscar }) => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto Inicial', precio: '$1000', imagen: 'ruta/imagen1.png' }
  ]);

  const handleNuevoProducto = (nuevoProducto) => {
    const id = productos.length + 1;
    setProductos([...productos, { id, ...nuevoProducto }]);
    console.log("Producto añadido al menú:", nuevoProducto); // Registro de depuración
  };

  return (
    <Router>
      <div className="menu">
        <Navbar onBuscar={onBuscar} />
        <Switch>
          <Route path="/" component={() => <TarjetaProductos productos={productos} busqueda={busqueda} />} />
          <Route path="/detalle/:productId" component={Tarjetadetalle} />
          <Route path="/agregar" component={() => <Agregar onNuevoProducto={handleNuevoProducto} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Menu;
