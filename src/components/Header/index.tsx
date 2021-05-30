import React from 'react'
import Link from 'next/link'
import { MdShoppingBasket } from 'react-icons/md'

import Logo from '../../assets/images/logo.svg'
import { Container } from '../../styles/components/Header'
import { useCart } from '../../hooks/useCart'

const Header = (): JSX.Element => {
  const { cart } = useCart()
  const cartSize = cart.length

  return (
    <Container>
      <Link href="/">
        <Logo />
      </Link>

      <Link href="/cart">
        <div className="cartContainer">
          <div>
            <strong>Meu carrinho</strong>
            <span data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
            </span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </div>
      </Link>
    </Container>
  )
}

export default Header
