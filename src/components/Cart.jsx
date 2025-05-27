export default function Cart({ items, onRemove, onIncrease, onDecrease }) {
  const getTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">🛒 Carrito</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="border p-4 rounded flex justify-between items-start"
            >
              <div className="w-3/4">
                <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">Talle: {item.size}</p>
                <p className="text-sm text-gray-500">Precio: ${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => onDecrease(item.id, item.size)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item.id, item.size)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">
                  Subtotal: ${(item.quantity * item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => onRemove(item.id, item.size)}
                  className="text-sm text-red-600 hover:underline mt-2 block"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg mt-4">
            Total: ${getTotal()}
          </div>
        </div>
      )}
    </div>
  )
}