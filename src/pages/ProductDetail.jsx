import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const COLORS = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(true);

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          ...data,
          rating: data.rating?.rate ?? 0,
          reviewCount: data.rating?.count ?? 0,
          imageSrc: data.image,
          imageAlt: data.title,
        });
      })
      .catch(() => {
        setProduct(null);
      });
  }, [id]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 300);
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage('Debes seleccionar un talle para agregar al carrito.');
      return;
    }
    if (quantity < 1) {
      setErrorMessage('La cantidad debe ser al menos 1.');
      return;
    }
    setErrorMessage('');
    const item = {
      id: product.id, 
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor.name,
    };
    if (onAdd) {
      onAdd(item);
    }
    handleClose();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-100 bg-opacity-40" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="rounded-lg object-contain w-full h-80 bg-white"
              />

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{product.title}</h1>
                <p className="mt-2 text-xl text-gray-800 font-semibold">${product.price}</p>
                <p className="mt-4 text-sm text-gray-600">{product.description}</p>

                <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'w-5 h-5'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center gap-x-3 mt-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        disabled={false}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                            active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                            checked ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(color.class, 'h-8 w-8 rounded-full border border-black/10')}
                        />
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mt-6">
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Talle
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Selecciona un talle</option>
                    {SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-24 border rounded px-3 py-2"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

