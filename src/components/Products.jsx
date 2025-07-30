import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./styleProducts.css";
import { FaShoppingCart } from "react-icons/fa";

const Products = ({ product }) => {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const increase = () => {
    if (cantidad < product.stock) setCantidad(cantidad + 1);
  };

  const decrease = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < cantidad; i++) {
      addToCart(product);
    }
    setCantidad(1);
  };

  return (
    <section className="card">
      <div className="imageContainer">
        <img src={product.imagen} alt={product.nombre} className="image" />
      </div>

      <h3 className="name">{product.nombre}</h3>
      <p className="prize">${product.precio}</p>
      <p className="stock">Stock: {product.stock}</p>

      <div className="qtyContainer">
        <button className="qtyButton" onClick={decrease}>
          -
        </button>
        <span>{cantidad}</span>
        <button className="qtyButton" onClick={increase}>
          +
        </button>
      </div>

      <button className="addCartButton" onClick={handleAddToCart}>
        <FaShoppingCart style={{ marginRight: 6 }} />
        Agregar al carrito
      </button>
    </section>
  );
};

export default Products;
