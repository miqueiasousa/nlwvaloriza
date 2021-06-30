import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../core/ApiError'

export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    const { status, message } = err

    return res.status(status).json({ message })
  }

  return res.status(500).json({
    message: 'Internal Server Error'
  })
}
