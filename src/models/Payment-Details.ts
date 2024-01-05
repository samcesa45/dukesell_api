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
import { PayType } from './Payment'

@Table
export class Payment_Details extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id!: number

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  amount!: number

  @AllowNull(false)
  @ForeignKey(() => PayType)
  @Column(DataTypes.INTEGER)
  pay_type!: number
}
