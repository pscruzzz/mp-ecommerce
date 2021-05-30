import { NextApiRequest, NextApiResponse } from 'next'

export default async function products(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const {
    query: { id }
  } = request

  const products = [
    {
      id: 1,
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg'
    },
    {
      id: 2,
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
      price: 139.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg'
    },
    {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg'
    },
    {
      id: 5,
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
      price: 139.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg'
    },
    {
      id: 6,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg'
    },
    {
      id: 4,
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg'
    }
  ]

  if (id) {
    const formattedResponseJson = products.filter(product => {
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
