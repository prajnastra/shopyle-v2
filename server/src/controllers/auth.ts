import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { expressjwt as expressJwt } from 'express-jwt'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { User, IUser } from '../models'
import { AuthRequest } from '../types'

const SECRET = process.env.SECRET || 'e7RP51xhoS3exVNSDRMB'

export const signup = (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  const user = new User(req.body)

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'NOT able to save user in DB',
      })
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    })
  })
}

export const signin = (req: Request, res: Response) => {
  const errors = validationResult(req)
  const { email, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  User.findOne({ email }, (err: mongoose.CallbackError, user: IUser) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'USER email does not exists',
      })
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match',
      })
    }

    // create token
    const token = jwt.sign({ _id: user._id }, SECRET)

    // put token in cookie
    // valid for 15 minutes
    res.cookie('token', token, {
      expires: new Date(Date.now() + 900000),
    })

    // send response to front end
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })
  })
}

export const signout = (req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({
    message: 'User signout successfully',
  })
}

// protected routes
export const isSignedIn = expressJwt({
  secret: SECRET,
  algorithms: ['HS256'],
})

// custom middlewares
export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    })
  }
  next()
}

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req?.profile?.role === 0) {
    return res.status(403).json({
      error: 'You are not ADMIN, Access denied',
    })
  }
  next()
}
