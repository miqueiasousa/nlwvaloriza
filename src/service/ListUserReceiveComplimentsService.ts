import { getCustomRepository } from 'typeorm'

import { ComplimentsRepository } from '../repository/ComplimentsRepository'

export class ListUserReceiveComplimentsService {
  async execute (userId: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: userId
      }
    })

    return compliments
  }
}
