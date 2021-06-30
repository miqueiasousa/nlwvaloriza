import { getCustomRepository } from 'typeorm'

import { ComplimentsRepository } from '../repository/ComplimentsRepository'
import { UsersRepository } from '../repository/UsersRepository'
import { BadRequest, NotFound } from '../core/ApiError'

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

export class CreateComplimentService {
  async execute ({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const usersRepository = getCustomRepository(UsersRepository)

    if (user_sender === user_receiver) {
      throw new BadRequest()
    }

    const isUserReceiverExists = !!await usersRepository.findOne(user_receiver)

    if (!isUserReceiverExists) {
      throw new NotFound()
    }

    const compliment = complimentsRepository.createAndGenUUID({ tag_id, user_sender, user_receiver, message })

    await complimentsRepository.save(compliment)

    return compliment
  }
}
