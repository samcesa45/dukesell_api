import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import { Users } from '../models/User'
import { Cart } from '../models/Cart'
import { Cart_Item } from '../models/Cart_Item'
import { Order } from '../models/Order'
import { Order_Item } from '../models/Order-Item'
import { Payment_Details } from '../models/Payment-Details'
import { PayType } from '../models/Payment'
import { Product } from '../models/Product'
import { UserAddresses } from '../models/User-Address'
import { UserPhones } from '../models/User-Phone'
require('dotenv').config()

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME!,
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD,
  // models: await importModels(__dirname + '/**/*.models.{ts,js}'),
  models: [
    Users,
    Product,
    UserAddresses,
    UserPhones,
    Cart,
    Cart_Item,
    Order,
    Order_Item,
    PayType,
    Payment_Details
  ],
  // models: [path.join(__dirname + '/**/*.model.ts')],
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!
})

export default sequelize
