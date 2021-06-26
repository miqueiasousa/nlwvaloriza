import { Request, Response } from 'express'

import { ListUserReceiveComplimentsService } from '../service/ListUserReceiveComplimentsService'

export class ListUserReceiveComplimentsController {
  async handle (req: Request, res: Response) {
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()

    const compliments = await listUserReceiveComplimentsService.execute(req.userId)

    return res.status(200).json(compliments)
  }
}
