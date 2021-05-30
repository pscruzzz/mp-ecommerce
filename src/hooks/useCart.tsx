import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import { toast } from 'react-toastify'
import { Product, Stock } from './useCartType'
import axios from 'axios'

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      setCart(JSON.parse(storagedCart))
      return
    }

    setCart([])
  }, [])

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        product => product.id === productId
      )
      const currentAmount = productExists ? productExists.amount : 0
      const desiredAmount = currentAmount + 1
      const { id, amount: availableAmount } = await axios
        .get(`api/stock/${productId}`)
        .then(response => {
          return response.data
        })

      if (desiredAmount > availableAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      if (productExists) {
        productExists.amount = desiredAmount
      } else {
        const product = await axios.get(`api/products/${productId}`)
        const newProduct = { ...product.data, amount: desiredAmount }
        updatedCart.push(newProduct)
      }

      setCart(updatedCart)

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na adição do produto')
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productIndex = updatedCart.findIndex(
        product => product.id === productId
      )

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1)
        setCart(updatedCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na remoção do produto')
    }
  }

  const updateProductAmount = async ({
    productId,
    amount
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return
      }

      const stock = await axios.get(`api/stock/${productId}`)
      const stockAmount = stock.data.amount

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        product => product.id === productId
      )
      if (productExists) {
        productExists.amount = amount
        setCart(updatedCart)
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
