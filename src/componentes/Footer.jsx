import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Contacto</h3>
            <p><img src="/insta.png" alt="Instagram" className="inline-block w-5 h-5" /> @mvdsclothes_9410</p>
            <p><img src="/insta.png" alt="Instagram" className="inline-block w-5 h-5" /> @potrero.ush</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Métodos de Pago</h3>
            <div className="flex justify-center space-x-4">
              <img src="/visa2-removebg-preview.png" alt="Visa" className="w-10" />
              <img src="/mastercard2-removebg-preview.png" alt="MasterCard" className="w-10" />
              <img src="/paypal-removebg-preview.png" alt="PayPal" className="w-10" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Ayuda</h3>
            <p>Preguntas frecuentes</p>
            <p>Sobre nosotros</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
