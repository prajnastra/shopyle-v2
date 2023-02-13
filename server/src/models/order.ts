import { Schema, model } from 'mongoose'
import { IOrder, IProductCart } from './types'

const { ObjectId } = Schema.Types

const ProductCartSchema = new Schema<IProductCart>({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  count: Number,
  price: Number,
})

const OrderSchema = new Schema<IOrder>(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: 'Recieved',
      enum: ['Cancelled', 'Delivered', 'Shipped', 'Processing', 'Recieved'],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const ProductCart = model<IProductCart>('ProductCart', ProductCartSchema)
export const Order = model<IOrder>('Order', OrderSchema)
