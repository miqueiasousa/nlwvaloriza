import { NextFunction, Request, Response } from 'express'

export function ensureAdmin (req: Request, res: Response, next: NextFunction) {
  // temporary value
  const isAdmin = true

  if (isAdmin) {
    return next()
  }

  return res.status(401).json({ error: 'Unauthorized' })
}
