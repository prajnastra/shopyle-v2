import axios, { AxiosResponse } from 'axios'

import { API } from '../utils'
import {
  AddCategoryPayload,
  Categories,
  AddProductPayload,
  Products,
} from './types'

// category routes
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

// file upload
export const uploadFileAPI = (
  body: FormData
): Promise<AxiosResponse<{ message: string; url: string }>> =>
  axios.post(`${API}/api/upload/`, body)

// product routes
export const getAllProductsAPI = (): Promise<AxiosResponse<Array<Products>>> =>
  axios.get(`${API}/api/products`)

export const addProductAPI = (
  userId: string,
  token: string,
  body: AddProductPayload
) =>
  axios.post(`${API}/api/product/create/${userId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const deleteProductAPI = (
  userId: string,
  token: string,
  productId: string
) =>
  axios.delete(`${API}/api/product/${productId}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
