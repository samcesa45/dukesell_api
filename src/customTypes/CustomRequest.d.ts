declare namespace Express {
  export interface Request {
    isAuth: boolean
    userId: string
  }
  export interface Response {
    isAuth: boolean
    userId: string
  }
}
