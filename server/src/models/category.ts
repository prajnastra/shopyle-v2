import { Schema, model } from 'mongoose'
import { ICategory } from './types'

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
)

const categoryModel = model<ICategory>('Category', categorySchema)

export default categoryModel
