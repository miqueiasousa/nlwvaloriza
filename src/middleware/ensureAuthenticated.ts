import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401)
  }

  const token = authorization.split(' ')[1]

  try {
    const { sub } = verify(token, 'DOGECOIN')

    req.userId = sub as string

    return next()
  } catch (error) {
    return res.sendStatus(401)
  }
}
