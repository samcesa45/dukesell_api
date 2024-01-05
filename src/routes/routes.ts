import { Router } from 'express'
import authRouter from '../api/features/auth/routes/auth'
import orderRouter from '../api/features/orders/routes/orders'
import productRouter from '../api/features/products/routes/products'

export default function routes() {
  const router = Router()

  router.use('/auth', authRouter)
  router.use('/products', productRouter)

  return router
}
