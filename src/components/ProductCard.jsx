import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "./static/stylestatic.css";

const ProductCard = ({ product, isAdmin, onEdit, onDelete }) => {
  const { addToCart, cart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  // Contar cuántos productos iguales hay en el carrito
  const quantityInCart = cart.filter(
    (item) => item.id === product.id && item.size === product.size
  ).length;

  const stockRestante = product.stock - quantityInCart;

  const increase = () => {
    if (cantidad < stockRestante) {
      setCantidad(cantidad + 1);
    } else {
      toast.warn("No hay más stock disponible.");
    }
  };

  const decrease = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    if (cantidad > stockRestante) {
      toast.error("La cantidad seleccionada excede el stock disponible.");
      return;
    }

    for (let i = 0; i < cantidad; i++) {
      addToCart(product);
    }

    toast.success(`${cantidad} x ${product.nombre} agregado(s) al carrito`);
    setCantidad(1);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm product-card">
        <div className="">
          <img
            src={product.imagen}
            className="card-img-top product-card-img"
            alt={product.nombre}
          />
          {isAdmin && (
            <div className="admin-buttons-overlay">
              <button
                className="btn btn-light btn-sm"
                onClick={() => onEdit(product)}
                title="Editar Producto"
              >
                <i className="bi bi-pencil-square">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(product.id)}
                title="Eliminar Producto"
              >
                <i className="bi bi-trash3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </i>
              </button>
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{product.nombre}</h5>
          <p className="card-text text-muted flex-grow-1">
            {product.descripcion.substring(0, 100)}...
          </p>
          <p className="card-text fs-4 fw-bolder text-danger mb-2">
            ${product.precio}
          </p>
          <p className="text-muted small mb-3">
            Stock disponible: {stockRestante}
          </p>

          {isAdmin ? (
            <div className="mt-auto text-center text-muted small fst-italic">
              Modo Administrador
            </div>
          ) : (
            <div className="mt-auto">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={decrease}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span className="mx-3 fw-bold fs-5">{cantidad}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={increase}
                  disabled={cantidad >= stockRestante}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-warning w-100"
                onClick={handleAddToCart}
                disabled={stockRestante <= 0}
              >
                <i className="bi bi-bag me-2"></i>
                {stockRestante <= 0 ? "Sin stock" : "Agregar al Carrito"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
