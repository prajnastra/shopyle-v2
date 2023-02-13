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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get(
  '/orders/user/:userId',
  isSignedIn,
  isAuthenticated,
  userPurchaseList
)

export default router
