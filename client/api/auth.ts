import axios, { AxiosResponse } from 'axios'

import { API } from '../utils'
import { LoginPayload } from './types'

export const signinAPI = (body: LoginPayload) =>
  axios.post(`${API}/auth/login/`, body)
