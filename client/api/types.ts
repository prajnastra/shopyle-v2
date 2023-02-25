export interface SignupPayload {
  name: string
  email: string
  password: string
}

export interface AddCategoryPayload {
  name: string
}

export interface Categories {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface AddProductPayload {
  name: string
  description: string
  price: number
  category: string
  stock: number
  photo: string
}

export interface Products {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  sold: number
  photo: string
  createdAt: string
  updatedAt: string
}

export interface OrderPayload {
  products: Array<Products>
  amount: number | string
  transaction_id: string
}
