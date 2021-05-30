import { NextApiRequest, NextApiResponse } from 'next'
import { apiMP } from '../../services/api'

export default async function products(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request

  body.external_reference = process.env.EXTERNAL_REFERENCE
  body.notification_url = process.env.WEBHOOK

  body.back_urls = {
    success: `${process.env.BASE_URL}/orderplaced/success`,
    failure: `${process.env.BASE_URL}/orderplaced/failure`,
    pending: `${process.env.BASE_URL}/orderplaced/pending`
  }

  const responseMP = await apiMP.post('checkout/preferences', body)
  const responseData = responseMP.data
  response.send(responseData.init_point)
}
