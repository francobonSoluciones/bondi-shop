import React from "react";
import "./stylestatic.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto text-center justify-content-center">
      <div className="container justify-content-center d-flex flex-column flex-md-row align-items-center">

        <div className="col-12 col-md-6 text-center justify-content-center">
          &copy; {new Date().getFullYear()} BondiShop. Todos los derechos reservados.
        </div>


      </div>
    </footer>
  );
};

export default Footer;
