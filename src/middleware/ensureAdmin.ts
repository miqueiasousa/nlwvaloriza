import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UsersRepository } from '../repository/UsersRepository'

export async function ensureAdmin (req: Request, res: Response, next: NextFunction) {
  const usersRepository = getCustomRepository(UsersRepository)

  const user = await usersRepository.findOne(req.userId)

  if (user?.admin) {
    return next()
  }

  return res.sendStatus(403)
}
