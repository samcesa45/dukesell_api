import { Router } from 'express'
import { body, CustomValidator, validationResult } from 'express-validator'
import login from '../controllers/login'
import register from '../controllers/register'
import { Users } from '../../../../models/User'

const authRouter = Router()

authRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter valid email'),
    body('password').isLength({ min: 6 })
  ],
  login
)

const isValidUser: CustomValidator = (value) => {
  return Users.findAll({
    where: {
      email: value
    }
  }).then((user) => {
    if (user.length > 0) {
      return Promise.reject('Email already exists')
    }
  })
}
authRouter.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Enter valid email')
      .custom(isValidUser),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
  ],
  register
)

export default authRouter
