import express from 'express'

import { isSignedIn, isAuthenticated } from '../controllers/auth'
import {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} from '../controllers/user'

const router = express.Router()

router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser)

router.get(
  '/orders/user/:userId',
  isSignedIn,
  isAuthenticated,
  userPurchaseList
)

export default router
