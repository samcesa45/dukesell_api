import express from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { constants } from 'fs'
import jwt, { Jwt } from 'jsonwebtoken'
import { isAuth } from '../../../../middlewares/isAuth'
import { Users } from '../../../../models/User'
import { Cart } from '../../../../models/Cart'
import { BodyData } from './types'
require('dotenv').config()

const login = (req: express.Request, res: express.Response, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const body = req.body as BodyData

  const email = body.email
  const password = body.password
  let loadedUser: Users | null

  Users.findOne({
    where: {
      email: email
    }
  })
    .then((user) => {
      if (!user) {
        const error = new Error('user not found')
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isFound) => {
      if (!isFound) {
        const error = new Error('wrong password')
        throw error
      }

      const token = jwt.sign(
        {
          email: loadedUser?.email,
          userId: loadedUser?.id
        },
        process.env.JWT_SECRET?.toString() as jwt.Secret,
        {
          expiresIn: process.env.SESSION_EXP
        }
      )

      res.status(200).json({
        token: token,
        userId: loadedUser?.id
      })
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
}

export default login
