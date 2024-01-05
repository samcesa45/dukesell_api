import fs from 'fs'
import multer from 'multer'
import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import { Cart } from './models/Cart'
import { Cart_Item } from './models/Cart_Item'
import { Order } from './models/Order'
import { Payment_Details } from './models/Payment-Details'
import { Product } from './models/Product'
import { UserAddresses } from './models/User-Address'
import { UserPhones } from './models/User-Phone'
import { Order_Item } from './models/Order-Item'
import { Users } from './models/User'
import sequelize from './database/database'
import bodyParser from 'body-parser'
import { isAuth } from './middlewares/isAuth'
import routes from './routes/routes'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { ProductResolver } from './api/shared/graphqlResolvers/productResolver'
import { CartResolver } from './api/shared/graphqlResolvers/cartResolver'
import { OrderResolver } from './api/shared/graphqlResolvers/orderResolver'

const { v4: uuidv4 } = require('uuid')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(path.join(__dirname, '..', 'images'), () => {
      //console.log(path.join(__dirname,'..', "images"))
      cb(null, 'images')
    })
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname)
  }
})

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

/// create tables and its relationships MySql;

Users.hasOne(Cart)
Cart.belongsTo(Users)
Users.hasMany(UserAddresses)
UserAddresses.belongsTo(Users)
Users.hasMany(UserPhones)
UserPhones.belongsTo(Users)
Product.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' })
Users.hasMany(Product)
Cart.belongsToMany(Product, { through: Cart_Item })
Users.hasMany(Order)
Order.belongsTo(Users)
Order.belongsToMany(Product, { through: Order_Item })
Order.hasOne(Payment_Details)

async function run() {
  require('dotenv').config()
  const app = express()

  app.use(bodyParser.json())

  app.use(
    multer({
      storage: fileStorage,
      fileFilter: fileFilter
    }).single('imageUrl')
  )

  app.use(
    express.urlencoded({
      extended: false
    })
  )
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })

  app.use(isAuth)
  //register routes for the REST Api
  app.use('/api/v1', routes())

  app.use((error: any, req: any, res: any, next: any) => {
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({
      message: message
    })
  })

  const schema = await buildSchema({
    resolvers: [ProductResolver, CartResolver, OrderResolver],
    emitSchemaFile: true
    // orphanedTypes:[CartData]
  })
  app.use(
    '/graphql',
    graphqlHTTP((req, res, graphQLParams) => {
      return { schema: schema, graphiql: true, context: { req } }
    })
  )
  sequelize

    .sync()
    .then((res) => {
      //console.log(res);
      console.log('Connection has been established successfully.')

      app.listen(process.env.PORT, () => {
        console.log(`Litening on port  ${process.env.PORT}`)
      })
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
}
run()
