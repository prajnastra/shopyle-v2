import { Schema, model } from 'mongoose'
import crypto from 'crypto'
import { v1 as uuidv1 } from 'uuid'
import { IUser } from './types'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

userSchema
  .virtual('password')
  .set(function (password: any) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  autheticate: function (plainpassword: string) {
    return this.securePassword(plainpassword) === this.encry_password
  },

  securePassword: function (plainpassword: string) {
    if (!plainpassword) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}

const userModel = model<IUser>('User', userSchema)

export default userModel
