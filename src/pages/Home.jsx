import { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../api'
import NewIncome from '../components/NewIncome'
export default function Home({ onAdd }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  return (
    <>
    <NewIncome/>
    
    <ProductList products={products} onAdd={onAdd} />
  
    </>
  )
}