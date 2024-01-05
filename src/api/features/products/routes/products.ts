import { Router } from 'express'
import { body, CustomValidator, validationResult } from 'express-validator'
import { createProduct, updateProduct } from '../controllers/createProduct'

const productRouter = Router()

productRouter.post(
  '/create',
  [
    body('name').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
    body('imageUrl').not().isEmpty().trim(),
    body('price').isNumeric().not().isEmpty(),
    body('quantity').isNumeric().not().isEmpty()
  ],
  createProduct
)
productRouter.put(
  '/update/:id',
  [
    body('name').not().isEmpty().trim(),
    body('imageUrl').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
    body('price').isNumeric().not().isEmpty(),
    body('quantity').isNumeric().not().isEmpty()
  ],
  updateProduct
)

export default productRouter
