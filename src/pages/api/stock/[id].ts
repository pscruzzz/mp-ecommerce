import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const {
    query: { id }
  } = request

  const stock = [
    {
      id: 1,
      amount: 3
    },
    {
      id: 2,
      amount: 5
    },
    {
      id: 3,
      amount: 2
    },
    {
      id: 4,
      amount: 1
    },
    {
      id: 5,
      amount: 5
    },
    {
      id: 6,
      amount: 10
    }
  ]

  if (id) {
    const formattedResponseJson = stock.filter(product => {
      return product.id.toString() === id
    })

    if (!formattedResponseJson.length) {
      return response.status(404).send({ error: 'No product found' })
    }

    response.setHeader('Cache-Control', 's-maxage=100, stale-while-revalidate')

    return response.send(formattedResponseJson[0])
  } else {
    return response.status(404).send('Parameter needs to be a string')
  }
}
