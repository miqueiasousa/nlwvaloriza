import { getCustomRepository } from 'typeorm'

import { ComplimentsRepository } from '../repository/ComplimentsRepository'
import { UsersRepository } from '../repository/UsersRepository'

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
      throw new Error('Incorrect user receiver')
    }

    const isUserReceiverExists = !!await usersRepository.findOne(user_receiver)

    if (!isUserReceiverExists) {
      throw new Error('User receiver does not exists')
    }

    const compliment = complimentsRepository.createAndGenUUID({ tag_id, user_sender, user_receiver, message })

    await complimentsRepository.save(compliment)

    return compliment
  }
}
