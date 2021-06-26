import { getCustomRepository } from 'typeorm'

import { ComplimentsRepository } from '../repository/ComplimentsRepository'

export class ListUserSendComplimentsService {
  async execute (userId: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: userId
      }
    })

    return compliments
  }
}
