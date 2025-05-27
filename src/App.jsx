import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'
import ProtectedPage from './pages/ProtectedPage'
import Footer from './components/Footer'
function App() {
  const [cart, setCart] = useState([])


  const handleRemoveFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)))
  }
  
  const handleIncreaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }
  
  const handleDecreaseQty = (id, size) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.size === product.size)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      return [...prevCart, product]
    })
  }
  return (
    <>
<Navbar
  cartItems={cart}
  onRemove={handleRemoveFromCart}
  onIncrease={handleIncreaseQty}
  onDecrease={handleDecreaseQty}
/>     

<Routes>
  <Route path="/" element={<Home onAdd={handleAddToCart} />} />
  <Route path="/product/:id" element={<ProductDetail onAdd={handleAddToCart} />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/protected"
    element={
      <ProtectedRoute>
        <ProtectedPage />
      </ProtectedRoute>
    }
  />
  <Route
  path="/product/:id"
  element={<ProductDetail onAdd={handleAddToCart} />}
/>
</Routes>
<Footer/>
    </>
  )
}

export default App