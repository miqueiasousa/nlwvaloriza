import { NextFunction, Request, Response } from 'express'

import { User } from '../model/User'

export async function ensureAdmin (req: Request, res: Response, next: NextFunction) {
  const user = await User.findOne(req.userId)

  if (user?.admin) {
    return next()
  }

  return res.sendStatus(403)
}
