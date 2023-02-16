import axios from 'axios'

import { API } from '../utils'
import { SignupPayload } from './types'

export const signupAPI = (body: SignupPayload) =>
  axios.post(`${API}/api/signup/`, body)
