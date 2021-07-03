import { getCustomRepository } from 'typeorm'

import { ComplimentsRepository } from '../repository/ComplimentsRepository'
import { TagsRepository } from '../repository/TagsRepository'
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
    const tagsRepository = getCustomRepository(TagsRepository)
    const usersRepository = getCustomRepository(UsersRepository)

    if (user_sender === user_receiver) {
      throw new BadRequest()
    }

    const isTagExists = !!await tagsRepository.findOne(tag_id)
    const isUserReceiverExists = !!await usersRepository.findOne(user_receiver)

    if (!isTagExists || !isUserReceiverExists) {
      throw new NotFound()
    }

    const compliment = complimentsRepository.create({ tag_id, user_sender, user_receiver, message })

    await complimentsRepository.save(compliment)

    return compliment
  }
}
