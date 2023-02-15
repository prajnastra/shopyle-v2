import express from 'express'

import { isSignedIn, isAuthenticated, isAdmin } from '../controllers/auth'
import { getUserById } from '../controllers/user'
import {
  getProductById,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} from '../controllers/product'

const router = express.Router()

//all of params
router.param('userId', getUserById)
router.param('productId', getProductById)

//all of actual routes
//create route
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
)

// read routes
router.get('/product/:productId', getProduct)

//delete route
router.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
)

//update route
router.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
)

//listing route
router.get('/products', getAllProducts)

router.get('/products/categories', getAllUniqueCategories)

export default router
