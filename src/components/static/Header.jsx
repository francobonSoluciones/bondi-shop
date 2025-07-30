import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Cart from "../Cart";
import Logo from "../../assets/logo.png"; 
const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className=" text-white shadow-md sticky top-0 z-50 ">
      <nav className="">
        <div className="flex items-center justify-between h-10">

          <Link to="/" className="">
            <img src={Logo} className="h-15" alt="" />
          </Link>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Inicio
              </NavLink>
              <NavLink
                to="/about"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Sobre Nosotros
              </NavLink>
              <NavLink
                to="/products"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Productos
              </NavLink>
              <NavLink
                to="/contact"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Contacto
              </NavLink>
              {user && user.username === "admin" && (
                <NavLink
                  to="/admin"
                  className="text-white hover:text-blue-200 transition duration-300"
                >
                  Admin
                </NavLink>

              )}

{user ? (
              <div className="ml-4 flex ">
                <span className="text-sm">Hola, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-sm"
              >
                Login
              </button>
            )}
            </div>
            
            <button
              className="text-white text-2xl ml-4 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`bi ${menuOpen ? 'bi-bag' : 'bi-bag'}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-width" viewBox="0 0 16 16">
  <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"/>
</svg></i>
            </button>

            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </div>
          <button
            className="relative text-white text-2xl ml-4"
            onClick={() => setCartOpen(true)}
          > <i className="bi bi-bag">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
            </i>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

        </div>

      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-700 p-4 space-y-4`}
      >
        
        <NavLink
          to="/"
          className="block text-white text-xl"
          onClick={() => setMenuOpen(false)}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/about"
          className="block text-white text-xl"
          onClick={() => setMenuOpen(false)}
        >
          Sobre Nosotros
        </NavLink>
        <NavLink
          to="/products"
          className="block text-white text-xl"
          onClick={() => setMenuOpen(false)}
        >
          Productos
        </NavLink>
        <NavLink
          to="/contact"
          className="block text-white text-xl"
          onClick={() => setMenuOpen(false)}
        >
          Contacto
        </NavLink>
        {user && user.username === "admin" && (
          <NavLink
            to="/admin"
            className="block text-white text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </NavLink>
        )}
        {user ? (
          <>
            <span className="block text-white text-xl">Hola, {user.username}</span>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-left text-white text-xl"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="block text-left text-white text-xl"
          >
            Login
          </button>
        )}

      </div>
    </header>
  );
};

export default Header;
