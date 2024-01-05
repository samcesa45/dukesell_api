import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import {
  sendFailureResponse,
  sendNotFoundFailureResponse,
  sendSuccessResponse
} from '../../../shared/globals/server/serverResponse'
import { Product } from '../../../../models/Product'
import path from 'path'
import fs from 'fs'

const createProduct = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuth) {
    return sendFailureResponse({
      res,
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  if (!req.file) {
    return sendFailureResponse({
      res,
      statusCode: 422,
      message: 'No Image provided'
    })
  }

  const name = req.body.name
  const imageUrl = req.file.path.replace('\\', '/')
  const description = req.body.description
  const price = req.body.price
  const quantity = req.body.quantity

  Product.create({
    name: name,
    imageUrl: imageUrl,
    description: description,
    price: price,
    quantity: quantity,
    UserId: req.userId
  }).then((result) => {
    return sendSuccessResponse({
      res,
      statusCode: 201,
      message: 'Product created successfully',
      data: { result }
    })
  })
}

const updateProduct = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.id

  if (!req.isAuth) {
    sendFailureResponse({
      res,
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const name = req.body.name
  let imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const quantity = req.body.quantity

  if (req.file) {
    clearImage(req.body.imageUrl)
    imageUrl = req.file.path.replace('\\', '/')
  }
  if (!imageUrl) {
    sendFailureResponse({
      res,
      statusCode: 422,
      message: 'No Image Provided'
    })
  }

  try {
    const product = await Product.findByPk(productId)
    let updatedProduct
    if (!product) {
      return sendFailureResponse({
        res,
        statusCode: 404,
        message: 'Product not found'
      })
    }

    if (product.UserId.toString() === req.userId.toString()) {
      product.imageUrl = imageUrl
      product.name = name
      product.description = description
      product.price = price
      product.quantity = quantity

      updatedProduct = await product.save()
    }
    if (updatedProduct) {
      return sendSuccessResponse({
        res,
        statusCode: 200,
        message: 'Product updated successfully',
        data: { updatedProduct }
      })
    }
  } catch (error) {
    console.log(error)
    sendFailureResponse({
      res,
      statusCode: 500,
      message: 'Server error'
    })
    next(error)
  }
}

export { createProduct, updateProduct }

const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, '../../', filePath)
  fs.unlink(filePath, (err) => console.log(err))
}
