import express from 'express'
import { check } from 'express-validator'
import { signout, signup, signin } from '../controllers/auth'

const router = express.Router()

router.post(
  '/signup',
  [
    check('name', 'name should be at least 3 char').isLength({ min: 3 }),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be at least 3 char').isLength({
      min: 3,
    }),
  ],
  signup
)

router.post(
  '/signin',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password field is required').isLength({ min: 1 }),
  ],
  signin
)

router.get('/signout', signout)

export default router
