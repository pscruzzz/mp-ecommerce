import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { CartProvider } from '../hooks/useCart'

import 'react-toastify/dist/ReactToastify.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
