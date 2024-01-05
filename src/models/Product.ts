import {
  Column,
  Model,
  Sequelize,
  Table,
  DataType,
  AutoIncrement,
  PrimaryKey,
  NotNull,
  AllowNull,
  ForeignKey
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

import sequelize from '../database/database'
import { Users } from './User'
import { ArgsType, Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { type } from 'os'

@Table
@ObjectType()
export class Product extends Model {
  @Field((type) => ID)
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  name!: string

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  imageUrl!: string

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  description!: string

  @Field()
  @AllowNull(false)
  @Column(DataTypes.DOUBLE)
  price!: number

  @Field()
  @AllowNull(false)
  @Column(DataTypes.DOUBLE)
  quantity!: number

  @Field()
  @AllowNull(true)
  @ForeignKey(() => Users)
  @Column(DataTypes.INTEGER)
  UserId!: number
}

// import mongoose from 'mongoose'

// const productSchema = new mongoose.Schema({
//   name:{
//     type:String,
//     required:[true, 'name is required'],
//     minLength:5
//   },
//   description:{
//     type:String,
//     required:[true, 'Description is required'],
//     minLength:15
//   },
//   price:{
//     type:Number,
//     required:[true, 'Price is required'],
//   },
//   imageUrl:{
//     type:String,
//     required:[true,'Image is required']
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now,
//   },
// })

// productSchema.set('toJSON', {
//   transform:(doc,ret) => {
//     ret.id = ret._id.toString()
//     delete ret._id
//     delete ret.__v
//   }
// })

// const Product = mongoose.model('product', productSchema)

// export default Product
