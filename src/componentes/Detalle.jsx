import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TarjetaDetalle from './Tarjetadetalle'; // Componente de detalle del producto

const Detalle = () => {
  // Estado de los modals
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de inicio de sesión
  const [isCarritoOpen, setIsCarritoOpen] = useState(false); // Modal del carrito

  // Funciones para abrir y cerrar el modal de inicio de sesión
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Funciones para abrir y cerrar el modal del carrito
  const handleOpenCarrito = () => setIsCarritoOpen(true);
  const handleCloseCarrito = () => setIsCarritoOpen(false);

  return (
    <div className="detalle-pagina min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Incluye el Navbar con los controladores de los modals */}
      <Navbar handleOpenModal={handleOpenModal} handleOpenCarrito={handleOpenCarrito} />

      {/* Tarjeta de detalle del producto */}
      <div className="flex-grow">
        <TarjetaDetalle />
      </div>

      {/* Modal de inicio de sesión */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={handleCloseModal}>
              X
            </button>

            <h2 className="text-xl font-bold mb-6 text-white text-center mt-10">
              Crea tu cuenta o inicia sesión para obtener beneficios exclusivos
            </h2>

            <form>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Ej: Ejemplo@gmail.com" 
                  className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                />
                <input 
                  type="password" 
                  placeholder="Ingrese su contraseña" 
                  className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700">
                  Entrar
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p><a href="#" className="text-blue-400 hover:underline">¿Olvidó su contraseña?</a></p>
              <p>¿No tiene una cuenta? <a href="#" className="text-blue-400 hover:underline">Regístrese</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Modal del carrito de compras */}
      {isCarritoOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <button className="absolute top-4 right-4 text-white text-xl font-bold" onClick={handleCloseCarrito}>
              X
            </button>

            <h2 className="text-xl font-bold mb-6 text-white text-center mt-10">Carro de compras</h2>

            <div className="space-y-4">
              {/* Ejemplo de contenido del carrito */}
              <div className="flex items-center bg-gray-800 p-4 rounded-lg">
                <img 
                  src="puma_suede_xl.jpg" 
                  alt="Puma Suede XL" 
                  className="w-24 h-24 object-cover rounded mr-4" 
                />
                <div className="text-white">
                  <h3 className="font-bold">Puma Suede XL</h3>
                  <p>$65.000</p>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
              onClick={handleCloseCarrito}
            >
              Continuar compra
            </button>
          </div>
        </div>
      )}

      {/* Incluye el Footer */}
      <Footer />
    </div>
  );
};

export default Detalle;