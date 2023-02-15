import { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  lastname: string
  email: string
  userinfo: string
  encry_password: string
  salt: string
  _password: string
  role: number
  purchases: Array<string | null>
  autheticate: (plainpassword: string) => boolean
  securePassword: (plainpassword: string) => string
}

export interface ICategory extends Document {
  name: string
}

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: Schema.Types.ObjectId
  stock: number
  sold: number
  photo: string
}

export interface IProductCart extends Document {
  name: string
  count: number
  price: number
  product: Schema.Types.ObjectId
}

export interface IOrder extends Document {
  products: Array<IProductCart>
  name: string
  transaction_id: object
  amount: number
  address: string
  status: string
  updated: string
  user: Schema.Types.ObjectId
}
