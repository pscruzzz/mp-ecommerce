import React from 'react'
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline
} from 'react-icons/md'

import Header from '../../components/Header'
import axios from 'axios'

import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../util/format'
import { FormatBody } from '../../util/formatMPBody'

import {
  Container,
  ProductTable,
  Total,
  FormContainer
} from '../../styles/pages/Cart'
import { useForm } from 'react-hook-form'

interface Product {
  id: number
  title: string
  price: number
  image: string
  amount: number
}

interface IFormData {
  areaCode: string
  email: string
  firstName: string
  lastName: string
  number: string
  postalCode: string
  street: string
  telephone: string
}

const Cart: React.FC = () => {
  const { cart, removeProduct, updateProductAmount } = useCart()

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: IFormData) => {
    const items = cart.map(product => {
      return {
        id: product.id.toString(),
        title: product.title,
        description: product.title,
        picture_url: product.image,
        quantity: product.amount,
        currency_id: 'R$',
        unit_price: product.price
      }
    })
    const bodyData = FormatBody(
      items,
      data.firstName,
      data.lastName,
      data.email,
      data.areaCode,
      data.telephone,
      data.street,
      +data.number,
      data.postalCode
    )
    const response = await axios.post('api/create-preference', bodyData)
    const responseData = response.data
    window.location.replace(response.data)
    console.log(responseData, 'check')
  }

  const cartFormatted = cart.map((product: any) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))

  const total = formatPrice(
    cartFormatted.reduce((sumTotal: any, product: any) => {
      return sumTotal + product.price * product.amount
    }, 0)
  )

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 })
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 })
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  console.log(cart, 'cart hi')

  return (
    <>
      <Header />
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cart.map((product: any) => (
              <tr key={product.id} data-testid="product">
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      defaultValue={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
        <footer>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="subFormContainer">
              <div className="profileContainer">
                <h2>Profile</h2>
                <input
                  {...register('firstName')}
                  placeholder="First name"
                  defaultValue="Pedro"
                />
                <input
                  {...register('lastName')}
                  placeholder="Last name"
                  defaultValue="Cruz"
                />
                <input
                  {...register('email')}
                  placeholder="Email"
                  defaultValue="test_user_92801501@testuser.com"
                />
                <input
                  {...register('areaCode')}
                  placeholder="21"
                  defaultValue="21"
                />
                <input
                  {...register('telephone')}
                  placeholder="99999-9999"
                  defaultValue="999999999"
                />
              </div>
              <span className="divider" />
              <div className="shippingContainer">
                <h2>Shipping</h2>
                <input
                  {...register('street')}
                  placeholder="Nome da rua"
                  defaultValue="Rua"
                />
                <input
                  {...register('number')}
                  placeholder="Número da casa"
                  defaultValue="21"
                />
                <input
                  {...register('postalCode')}
                  placeholder="Código Postal"
                  defaultValue="24220000"
                />
              </div>
              <span className="divider" />
            </div>
            <div className="totalizerWrapper">
              <Total>
                <strong>{total}</strong>
              </Total>
              <button type="submit">Finalizar pedido</button>
            </div>
          </FormContainer>
        </footer>
      </Container>
    </>
  )
}

export default Cart
