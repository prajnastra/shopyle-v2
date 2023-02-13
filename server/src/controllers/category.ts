import { Request, Response, NextFunction } from 'express'

import { Category } from '../models'
import { CategoryRequest } from '../types'

export const getCategoryById = (
  req: CategoryRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: 'Category not found in DB',
      })
    }
    req.category = cate
    next()
  })
}

export const createCategory = (req: Request, res: Response) => {
  const category = new Category(req.body)
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'NOT able to save category in DB',
      })
    }
    res.json({ category })
  })
}

export const getCategory = (req: CategoryRequest, res: Response) => {
  return res.json(req.category)
}

export const getAllCategory = (req: Request, res: Response) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'NO categories found',
      })
    }
    res.json(categories)
  })
}

export const updateCategory = (req: CategoryRequest, res: Response) => {
  if (!req.category) {
    return res.status(400).json({
      error: 'Not able to find category',
    })
  }

  const category = req.category
  category.name = req.body.name

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to update category',
      })
    }
    res.json(updatedCategory)
  })
}

export const removeCategory = (req: CategoryRequest, res: Response) => {
  if (!req.category) {
    return res.status(400).json({
      error: 'Not able to find category',
    })
  }

  const category = req.category

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete this category',
      })
    }
    res.json({
      message: 'Successfull deleted',
      data: category,
    })
  })
}
