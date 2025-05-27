export default function CartDropdown({ cartItems, onRemove }) {
  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)

  if (cartItems.length === 0) {
    return <div className="p-4 text-sm text-gray-600">El carrito está vacío.</div>
  }

  return (
    <div className="p-4 max-h-96 overflow-y-auto">
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={`${item.id}-${item.size}`}
            className="flex justify-between items-start border-b pb-2"
          >
            <div className="w-3/4">
              <img className="w-full mb-2" src={item.image} alt={item.title} />
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">Talle: {item.size}</p>
              <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
              <p className="text-sm font-bold text-green-700">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
            <div>
              <button
                onClick={() => onRemove(item.id, item.size)}
                className="text-sm text-red-600 hover:underline"
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t mt-4 text-right font-bold text-gray-800">
        Total: ${getTotalPrice()}
      </div>
    </div>
  )
}