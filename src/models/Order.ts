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
import { Field, ID, ObjectType } from 'type-graphql'
import { type } from 'os'

@Table
@ObjectType()
export class Order extends Model {
  @Field((type) => ID)
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  address!: string

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  phoneNumber!: string

  @Field()
  @AllowNull(false)
  @Column(DataTypes.STRING)
  total!: string

  @Field()
  @AllowNull(true)
  @ForeignKey(() => Users)
  @Column(DataTypes.INTEGER)
  UserId!: number
}

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User',
//   },
//   status:{
//     type:String,
//   },
//   totalPrice:{
//     type:Number,
//     required:[true,'Total Price is required']
//   },
//   products:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Product'
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

// orderSchema.set('toJSON', {
//   transform:(doc, ret) => {
//     ret.id = ret._id.toString()
//     delete ret._id
//     delete ret.__v
//   }
// })

// const Order = mongoose.model('order', orderSchema)

// export default Order
