import axios, { AxiosResponse } from 'axios'

import { API } from '../utils'
import { AddCategoryPayload, Categories } from './types'

export const getAllCategoriesAPI = (): Promise<
  AxiosResponse<Array<Categories>>
> => axios.get(`${API}/api/categories`)

export const addCategoryAPI = (
  userId: string,
  token: string,
  body: AddCategoryPayload
) =>
  axios.post(`${API}/api/category/create/${userId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const deleteCategoryAPI = (
  userId: string,
  token: string,
  categoryId: string
) =>
  axios.delete(`${API}/api/category/${categoryId}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
