import { Link } from 'react-router-dom'
import CartDropdown from './CartDropdown'
import logo from '../assets/logo.png' 
export default function Navbar({ cartItems, onRemove, onIncrease, onDecrease }) {
  const getTotalQuantity = () => cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-stone-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl text-white font-bold"><img className="h-12 w-auto" src={logo} alt="" /></Link>
      <div className="flex items-center space-x-6">
        <Link to="/protected" className="bg-white text-black rounded-2xl text-decoration-none  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium">Login</Link>

        <div className="relative group">
          <button className="relative">
            🛒 <span className="text-sm font-semibold">({getTotalQuantity()})</span>
          </button>
          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded-md w-80 z-50">
            <CartDropdown
              cartItems={cartItems}
              onRemove={onRemove}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}