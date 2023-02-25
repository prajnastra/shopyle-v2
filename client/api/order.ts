import axios from 'axios'

import { API } from '../utils'
import { OrderPayload } from './types'

export const addOrderAPI = (
  userId: string,
  token: string,
  body: OrderPayload
) =>
  axios.post(`${API}/api/order/create/${userId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
