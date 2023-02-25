import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import { Product } from '../models'
import { AuthRequest } from '../types'

export const getProductById = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Product not found',
        })
      }
      req.product = product
      next()
    })
}

export const createProduct = (req: Request, res: Response) => {
  let product = new Product(req.body)

  //save to the DB
  product.save((err, product) => {
    if (err) {
      res.status(400).json({
        error: 'Saving tshirt in DB failed',
      })
    }
    res.json(product)
  })
}

export const getProduct = (req: AuthRequest, res: Response) => {
  if (!req.product) return

  return res.json(req.product)
}

// delete controllers
export const deleteProduct = (req: AuthRequest, res: Response) => {
  if (!req.product) return
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete the product',
      })
    }
    res.json({
      message: 'Deletion was a success',
      deletedProduct,
    })
  })
}

// delete controllers
export const updateProduct = (req: AuthRequest, res: Response) => {
  if (!req.product) return

  let product = req.product
  product = _.extend(product, req.body)

  //save to the DB
  product.save((err, product) => {
    if (err) {
      res.status(400).json({
        error: 'Updation of product failed',
      })
    }
    res.json(product)
  })
}

//product listing

export const getAllProducts = (req: AuthRequest, res: Response) => {
  Product.find().exec((err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'NO product FOUND',
      })
    }
    res.json(products)
  })
}

export const getAllUniqueCategories = (req: Request, res: Response) => {
  Product.distinct('category', {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'NO category found',
      })
    }
    res.json(category)
  })
}

export const updateStock = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let myOperations = req.body.products.map(
    (prod: { _id: string; count: number }) => {
      return {
        updateOne: {
          filter: { _id: prod._id },
          update: { $inc: { stock: -prod.count, sold: +prod.count } },
        },
      }
    }
  )

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Bulk operation failed',
      })
    }
    next()
  })
}
