import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/'
})

export const apiMP = axios.create({
  baseURL: 'https://api.mercadopago.com/',
  headers: {
    'x-integrator-id': process.env.INTEGRATOR_ID,
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`
  }
})
