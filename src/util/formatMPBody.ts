/* eslint-disable camelcase */
interface IItem {
  id: string
  title: string
  description: string
  picture_url: string
  quantity: number
  currency_id: string
  unit_price: number
}

export function FormatBody(
  items: IItem[],
  name: string,
  lastName: string,
  email: string,
  areaCode: string,
  phone: string,
  streetName: string,
  streetNumber: number,
  zipCode: string
): any {
  return {
    items: items,
    auto_return: 'approved',
    payer: {
      name: name,
      surname: lastName,
      email: email,
      phone: {
        area_code: areaCode,
        number: phone
      },
      identification: {},
      address: {
        street_name: streetName,
        street_number: streetNumber,
        zip_code: zipCode
      }
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'amex'
        }
      ],
      installments: 6
    },
    shipments: {
      free_methods: [{}],
      receiver_address: {}
    }
  }
}
