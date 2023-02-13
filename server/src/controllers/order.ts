import { CallbackError } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

import { IOrder, Order } from '../models'
import { OrderRequest } from '../types'

export const getOrderById = (
  req: OrderRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'NO order found in DB',
        })
      }
      req.order = order
      next()
    })
}

export const createOrder = (req: OrderRequest, res: Response) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save your order in DB',
      })
    }
    res.json(order)
  })
}

export const getAllOrders = (req: Request, res: Response) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No orders found in DB',
        })
      }
      res.json(order)
    })
}

export const getOrderStatus = (req: Request, res: Response) => {
  res.json(['Cancelled', 'Delivered', 'Shipped', 'Processing', 'Recieved'])
}

export const updateStatus = (req: OrderRequest, res: Response) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err: CallbackError, order: IOrder) => {
      if (err) {
        return res.status(400).json({
          error: 'Cannot update order status',
        })
      }
      res.json(order)
    }
  )
}
