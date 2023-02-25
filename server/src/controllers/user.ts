import { Response, NextFunction } from 'express'

import { User, Order, IProduct } from '../models'
import { AuthRequest, UserPurchase } from '../types'

export const getUserById = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      })
    }
    req.profile = user
    next()
  })
}

export const getUser = (req: AuthRequest, res: Response) => {
  if (!req.profile) return
  req.profile.salt = ''
  req.profile.encry_password = ''
  return res.json(req.profile)
}

export const updateUser = (req: AuthRequest, res: Response) => {
  if (!req.profile) return

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'You are not authorized to update this user',
        })
      }
      user.salt = ''
      user.encry_password = ''
      res.json(user)
    }
  )
}

export const userPurchaseList = (req: AuthRequest, res: Response) => {
  if (!req.profile) return

  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No Order in this account',
        })
      }
      return res.json(order)
    })
}

export const pushOrderInPurchaseList = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.profile) return

  let purchases: Array<UserPurchase> = []
  req.body.products.forEach((product: UserPurchase) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product?.count || 1,
      price: product.price,
      transaction_id: req.body.transaction_id,
    })
  })

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: 'Unable to save purchase list',
        })
      }
      next()
    }
  )
}
