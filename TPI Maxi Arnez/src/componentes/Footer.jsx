import React from 'react';
import './Footer.css';

export default function Footer(){ 

  return (
 <div>
 <footer className="menu-footer">
 <div className="contacto">
 <div className='IG'>
  <p><img src="insta.png" alt="mvds" /> @mvdsclothes_9410</p>
  <p><img src="insta.png" alt="potrero" /> @potrero.ush</p>
  </div>
  <br></br>
  <div className='Wsp'>
  <p><img src="logo wsp.png" alt="numero" /> 2901 611913</p>
  <p><img src="logo wsp.png" alt="numero" /> 2901 302583</p>
  </div>
  
 
  
 </div>
 
 <div className="metodos-pago">
   <p>Métodos de pago:</p>
   <br></br>
   <img src="visa2-removebg-preview.png" alt="Visa" />
   <img src="mastercard2-removebg-preview.png" alt="MasterCard" />
   <img src="paypal-removebg-preview.png" alt="PayPal" />
 </div>
 <div className="ayuda">
   <p>Preguntas frecuentes</p>
   <p>Sobre nosotros</p>
 </div>
</footer>
</div>
  
);

};

