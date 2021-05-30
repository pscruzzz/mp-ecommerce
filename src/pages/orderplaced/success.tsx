/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { apiMP } from '../../services/api'
import Header from '../../components/Header'
import {
  ProductElement,
  ProductDetails,
  ImageContainer,
  OrderDetails
} from '../../styles/pages/Success'

interface ISuccessProps {
  pageParams: IParamsProps
  ordersData: any
}

interface IParamsProps {
  collection_id?: string
  collection_status?: string
  external_reference?: string
  merchant_account_id?: string
  merchant_order_id?: string
  payment_id?: string
  payment_type?: string
  preference_id?: string
  processing_mode?: string
  site_id?: string
  status?: string
}

const Success: React.FC<ISuccessProps> = ({ pageParams, ordersData }) => {
  console.log(pageParams)
  console.log(ordersData)

  useEffect(() => {
    localStorage.setItem('@RocketShoes:cart', '')
  }, [])
  return (
    <>
      <Header />
      <OrderDetails>
        <div>
          <h1
            style={{ color: '#fff' }}
          >{`Your order ${ordersData.orderId}`}</h1>
          <h2 style={{ color: '#fff' }}>{'has been successfully completed'}</h2>
        </div>
        <div>
          <h2
            style={{ color: '#fff' }}
          >{`Order Status: ${ordersData.orderStatus}`}</h2>
          <h2
            style={{ color: '#fff' }}
          >{`Payment Status: ${ordersData.paymentStatus}`}</h2>
          <h3
            style={{ color: '#fff' }}
          >{`Order External Reference: ${ordersData.orderReference}`}</h3>
        </div>
      </OrderDetails>
      <div>
        {ordersData.items.map((item, index) => {
          return (
            <ProductElement key={index}>
              <ImageContainer>
                <img src={item.picture_url} />
              </ImageContainer>
              <ProductDetails>
                <h2>{item.title}</h2>
                <div>
                  <h2>{`Quantity: ${item.quantity}`}</h2>
                  <h2>{`Price: ${item.unit_price}`}</h2>
                </div>
              </ProductDetails>
            </ProductElement>
          )
        })}
      </div>
      <div>
        <h1
          style={{ color: '#fff' }}
        >{`Totalizer ${ordersData.totalAmount}`}</h1>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const pageParams: IParamsProps = ctx.query

  const response = await apiMP.get(
    `merchant_orders/${pageParams.merchant_order_id}`
  )

  const ordersData = {
    clientName: response.data.collector.nickname,
    orderReference: response.data.external_reference,
    orderId: response.data.id,
    paymentType: pageParams.payment_type,
    items: response.data.items,
    orderStatus: response.data.order_status,
    paidAmount: response.data.paid_amount,
    paymentStatus: response.data.payments[0].status,
    totalAmount: response.data.total_amount
  }

  return {
    props: {
      pageParams,
      ordersData
    }
  }
}

export default Success
