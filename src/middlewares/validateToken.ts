import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { NotAuthorizedError } from '../api/shared/globals/server/Error'
import { sendFailureResponse } from '../api/shared/globals/server/serverResponse'

export default function validateToken(req: Request, res: Response) {
  let token: string = req.headers.cookie ?? req.headers.authorization!

  if (!token || !token.includes('sid')) {
    const notAuthorizedError = new NotAuthorizedError('Unauthorized')
    return sendFailureResponse({
      res,
      statusCode: notAuthorizedError.statusCode,
      message: notAuthorizedError.message
    })
  }
}
