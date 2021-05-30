import styled from 'styled-components'
import { darken } from 'polished'

export const ProductElement = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 20px;
`
export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  margin-left: 20px;
`

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
`

export const ImageContainer = styled.div`
  height: 100%;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
  }
`
