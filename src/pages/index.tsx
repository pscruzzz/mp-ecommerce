import Head from 'next/head'

import React, { useState, useEffect, useCallback } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import Header from '../components/Header'

import { ProductList } from '../styles/pages/Home'
import { formatPrice } from '../util/format'
import { useCart } from '../hooks/useCart'
import axios from 'axios'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface ProductFormatted extends Product {
  priceFormatted: string
}

interface CartItemsAmount {
  [key: number]: number
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductFormatted[]>([])
  const { addProduct, cart } = useCart()

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount }
    newSumAmount[product.id] = product.amount

    return newSumAmount
  }, {} as CartItemsAmount)

  const loadProducts = useCallback(async () => {
    const response = await axios.get<Product[]>('/api/products')
    const responseData = response.data.map(product => {
      return {
        ...product,
        priceFormatted: formatPrice(product.price)
      }
    })

    console.log(responseData, 'hi')
    setProducts(responseData)
  }, [])

  useEffect(() => {
    loadProducts()
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Header />
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  )
}

export default Home
