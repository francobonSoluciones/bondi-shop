import React from "react";
import "./styleCart.css";
import { useCart } from "../context/CartContext";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const Cart = ({ isOpen, onClose, refetchProducts }) => {
  const { cart, setCart, deleteFromCart, clearCart } = useCart();

  const processedCart = cart.reduce((acc, product) => {
    const existing = acc.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  const total = processedCart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const handleFinalizePurchase = async () => {
    const grouped = cart.reduce((acc, item) => {
      const key = item.id;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 1 };
      } else {
        acc[key].quantity++;
      }
      return acc;
    }, {});

    const itemsArray = Object.values(grouped);

    try {
      await Promise.all(
        itemsArray.map(async (item) => {
          const newStock = Number(item.stock) - item.quantity;

          if (newStock < 0) {
            throw new Error(
              `Stock insuficiente para "${item.nombre}". Disponible: ${item.stock}`
            );
          }

          const response = await fetch(
            `https://686326ce88359a373e94065b.mockapi.io/products/${item.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                stock: newStock, 
              }),
            }
          );

          if (!response.ok) {
            const error = await response.text();
            throw new Error(
              `Fallo al actualizar el stock de "${item.nombre}": ${response.status} ${error}`
            );
          }
        })
      );

      clearCart();
      localStorage.removeItem("cart");
      toast.success("✅ ¡Compra realizada con éxito!");

setTimeout(() => {
  if (typeof refetchProducts === "function") {
    refetchProducts();
  }
  onClose(); 
}, 1000); 

      onClose();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      toast.error(error.message || "❌ Error al finalizar la compra.");
    }
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${isOpen ? "open" : ""} text-dark`}>
        <div className="cart-header">
          <h4>Carrito de Compras</h4>
          <button
            onClick={onClose}
            className="btn-close"
            aria-label="Cerrar carrito"
          />
        </div>

        <div className="cart-content">
          {processedCart.length === 0 ? (
            <div className="text-center p-5 d-flex flex-column justify-content-center h-100">
              <p className="lead mb-3">El carrito está vacío.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {processedCart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="cart-item-img me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="my-0 small">{item.nombre}</h6>
                    <small className="text-muted">
                      {item.quantity} × ${item.precio}
                    </small>
                  </div>
                  <span className="fw-bold me-3">
                    ${(item.precio * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteFromCart(item)}
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                  >
                    <BsTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {processedCart.length > 0 && (
          <div className="cart-footer">
            <div className="d-flex justify-content-between mb-3">
              <h5>Total:</h5>
              <h5 className="fw-bold">${total.toFixed(2)}</h5>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={handleFinalizePurchase}>
                Finalizar Compra
              </button>
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;