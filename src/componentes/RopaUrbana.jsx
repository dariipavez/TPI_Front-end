import React from 'react';
import { useRoute } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';

const RopaUrbana = () => {
  const [match, params] = useRoute('/ropa-urbana/:section');
  const section = params?.section;

  const renderContent = () => {
    switch (section) {
      case 'remeras':
        return <p>Contenido de Remeras</p>;
      case 'pantalones':
        return <p>Contenido de Pantalones</p>;
      case 'zapatillas':
        return <p>Contenido de Zapatillas</p>;
      default:
        return <p>Selecciona una categoría.</p>;
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Ropa Urbana</h1>
      {renderContent()}
      <Footer />
    </div>
  );
};

export default RopaUrbana;