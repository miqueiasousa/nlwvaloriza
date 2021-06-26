import { Request, Response } from 'express'

import { ListUserSendComplimentsService } from '../service/ListUserSendComplimentsService'

export class ListUserSendComplimentsController {
  async handle (req: Request, res: Response) {
    const listUserSendComplimentsService = new ListUserSendComplimentsService()

    const compliments = await listUserSendComplimentsService.execute(req.userId)

    return res.status(200).json(compliments)
  }
}
