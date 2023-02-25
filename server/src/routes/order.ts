import express from 'express'

import { isSignedIn, isAuthenticated, isAdmin } from '../controllers/auth'
import { getUserById, pushOrderInPurchaseList } from '../controllers/user'
import { updateStock } from '../controllers/product'
import {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  stripeCheckout,
} from '../controllers/order'

const router = express.Router()

//params
router.param('userId', getUserById)
router.param('orderId', getOrderById)

//Actual routes
//create
router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  stripeCheckout,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
)
//read
router.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
)

//status of order
router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
)
router.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
)

export default router
