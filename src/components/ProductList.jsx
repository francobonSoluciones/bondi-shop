import { useState } from 'react';
import { Link } from 'react-router-dom';

const tallesDisponibles = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductList({ products, onAdd }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            const [selectedSize, setSelectedSize] = useState('');

            return (
              <div key={product.id} className="group relative border p-4 rounded-md shadow-sm hover:shadow-md transition">
                <div className="w-full overflow-hidden rounded-md bg-white aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-60 w-full object-contain object-center group-hover:opacity-75"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm text-gray-900 font-semibold">{product.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                  <p className="mt-2 text-sm font-bold text-gray-900">${product.price}</p>

                  {/* Mostrar talles disponibles */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Talles:</p>
                    <div className="flex gap-1 flex-wrap">
                      {tallesDisponibles.map((size) => (
                        <span
                          key={size}
                          onClick={() => setSelectedSize(size)} 
                          className={`text-xs px-2 py-0.5 border rounded-full cursor-pointer ${selectedSize === size ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() =>
                        onAdd({
                          ...product,
                          quantity: 1,
                          size: selectedSize 
                        })
                      }
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
