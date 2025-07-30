import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const sameItems = prevCart.filter(
        (item) => item.id === product.id && item.size === product.size
      );
      const quantityInCart = sameItems.length;

      if (quantityInCart >= product.stock) {
        toast.error(`No hay más stock disponible para ${product.nombre}`);
        return prevCart;
      }

      return [...prevCart, product];
    });
  };

  const deleteFromCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1); 
        return newCart;
      }
      return prevCart;
    });
  };

  const removeAllFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === product.id && item.size === product.size)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        deleteFromCart,
        removeAllFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
