import { Request, Response } from 'express'

import { AuthenticateUserService } from '../service/AuthenticateUserService'

export class AuthenticateUserController {
  async handle (req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateUserService = new AuthenticateUserService()

    const { user, token } = await authenticateUserService.execute({ email, password })

    return res.status(200).json({ user, token })
  }
}
