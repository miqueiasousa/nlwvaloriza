import { Request, Response } from 'express'

import { SetAUserAsAdminService } from '../service/SetAUserAsAdminService'

export class SetAUserAsAdminController {
  async handle (req: Request, res: Response) {
    const { id } = req.params

    const setAUserAsAdminService = new SetAUserAsAdminService()

    await setAUserAsAdminService.execute(id)

    return res.sendStatus(204)
  }
}
