import express from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { constants } from 'fs'
import jwt, { Jwt } from 'jsonwebtoken'
import { isAuth } from '../../../../middlewares/isAuth'
import { Users } from '../../../../models/User'
import { Cart } from '../../../../models/Cart'
import { UserPhones } from '../../../../models/User-Phone'
import { UserAddresses } from '../../../../models/User-Address'

require('dotenv').config()

interface BodyData {
  name: string
  password: string
  email: string
  address?: string
  phoneNumber?: string
}

const signup = async function (
  req: express.Request,
  res: express.Response,
  next: any
) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const body = req.body as BodyData
  const name: string = body.name
  const email: string = body.email
  const password: string = body.password

  const address: string | undefined = body.address
  const phoneNumber: string | undefined = body.phoneNumber

  try {
    let hashedPassword = await bcrypt.hash(password, 12)

    const user = await Users.create({
      name: name,
      password: hashedPassword,
      email: email
    })
    if (address) {
      const addresses = await UserAddresses.create({
        address: address,
        UserId: user.id
      })
      user.addressId = addresses.id
    }
    if (phoneNumber) {
      const phones = await UserPhones.create({
        phoneNumber: phoneNumber,
        UserId: user.id
      })
      user.phoneNumberId = phones.id
    }
    await user.save()

    await Cart.create({
      UserId: user.id
    })
    res.status(201).json({
      message: 'User created',
      userId: user.id
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'creation error'
    })
  }
}

export default signup
