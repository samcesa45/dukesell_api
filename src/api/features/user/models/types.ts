import { Document, Types } from 'mongoose'
export interface IUser extends Document {
  _id: Types.ObjectId
  firstname: string
  lastname: string
  username: string
  accessToken?: string
  email: string
  password: string
  profileImage?: string
  createdAt: Date
}
