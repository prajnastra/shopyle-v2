import { Schema, model } from 'mongoose'
import { IProduct } from './types'

const { ObjectId } = Schema.Types

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const product = model<IProduct>('Product', productSchema)

export default product
