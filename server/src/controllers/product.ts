import _ from 'lodash'
import fs from 'fs'
import formidable from 'formidable'

import { CallbackError } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

import { Product, IProduct } from '../models'
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
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      })
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: 'Please include all fields',
      })
    }

    let product = new Product(fields)

    //handle file here
    if (file.photo) {
      // if (file.photo?.size > 3000000) {
      //   return res.status(400).json({
      //     error: 'File size too big!',
      //   })
      // }
      // product.photo.data = fs.readFileSync(file.photo.path)
      // product.photo.contentType = file.photo.type
    }
    console.log(product)

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'Saving tshirt in DB failed',
        })
      }
      res.json(product)
    })
  })
}

export const getProduct = (req: AuthRequest, res: Response) => {
  if (!req.product) return

  return res.json(req.product)
}

//middleware
export const photo = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.product || !req.product.photo.contentType) return

  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next()
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
  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      })
    }

    //updation code
    let product = req.product
    product = _.extend(product, fields)

    //handle file here
    if (file.photo) {
      // if (file.photo.size > 3000000) {
      //   return res.status(400).json({
      //     error: 'File size too big!',
      //   })
      // }
      // product.photo.data = fs.readFileSync(file.photo.path)
      // product.photo.contentType = file.photo.type
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'Updation of product failed',
        })
      }
      res.json(product)
    })
  })
}

//product listing

export const getAllProducts = (req: AuthRequest, res: Response) => {
  if (!req.queries) return
  let limit = req.queries.limit ? parseInt(req.queries.limit) : 8
  let sortBy = req.queries.sortBy ? req.queries.sortBy : '_id'

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
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
  let myOperations = req.body.order.products.map(
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
